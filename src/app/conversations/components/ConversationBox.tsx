"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";

import { Conversation, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  return (
    <>
      <div>{data.name}</div>
    </>
  );
};

export default ConversationBox;
