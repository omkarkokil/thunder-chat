import { FullMessageType } from "@/app/types";
import { Message } from "@prisma/client";
import React, { FC } from "react";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  return <div className="flex-1 overflow-y-auto">Body</div>;
};

export default Body;
