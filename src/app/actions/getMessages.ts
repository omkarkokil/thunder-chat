import client from "@/libs/prismadb";

const getMessages = async (conversationId: string) => {
    try {
        const messages = await client.message.findMany({
            where: {
                conversationId: conversationId,
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        return messages
    } catch (error: any) {
        console.log(error + "Server error in getMessages");
        return []

    }
}

export default getMessages