import client from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationId = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await client.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    return conversation
  } catch (error: any) {
    console.log(error, "server error");

    return null

  }
};

export default getConversationId;
