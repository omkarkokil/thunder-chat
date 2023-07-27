import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser.email)
      return new NextResponse("unauthorized", { status: 405 });

    if (isGroup && (!members || members.length < 2 || !name))
      return new NextResponse("Invalid data", { status: 400 });

    if (isGroup) {
      const newConversations = await client.conversations.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => {
                id: member.value;
              }),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversations);
    }

    const exisitingConversations = await client.conversations.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversations = exisitingConversations[0];
    if (singleConversations) {
      return NextResponse.json(singleConversations);
    }

    const newConversations = await client.conversations.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversations);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
