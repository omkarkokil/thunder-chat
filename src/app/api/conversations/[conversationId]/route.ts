import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    conversationId?: string

}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser()

        if (!currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const exisitingConversation = await client.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if (!exisitingConversation) { return new NextResponse("Invalid Id", { status: 400 }) }

        const deleteConversation = await client.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        return NextResponse.json(deleteConversation)
    } catch (error: any) {
        console.log(error);
        return new NextResponse("internal error", { status: 500 })

    }
}