import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    conversationId?: string
}

export async function POST(request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser()
        const { conversationId } = params
        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthorized", { status: 404 })
        }

        // find the exisiting conversations
        const conversation = await client.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if (!conversation) {
            return new NextResponse("Invalid Id", { status: 400 })
        }
        const lastMessage = conversation.messages[conversation.messages.length - 1]

        if (!lastMessage) { return NextResponse.json(conversation) }

        // update seen messages

        const updatedMessage = await client.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        return NextResponse.json(updatedMessage)

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 })

    }
}