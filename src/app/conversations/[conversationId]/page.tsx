import getConversationId from "@/app/actions/getConversationId";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversations = await getConversationId(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversations) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Header conversation={conversations} />
          <Body initialMessages={messages} />
          <Form />
        </div>
      </div>
    </>
  );
};

export default ChatId;
