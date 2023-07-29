import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json();
        const { message, image, conversationId } = body


        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse('unauthorized', { status: 400 })
        }

        const newMessages = await client.message.create({
            include: {
                seen: true,
                sender: true
            },
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        const updateConversations = await client.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessages.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        return NextResponse.json(newMessages)


    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 })

    }
}