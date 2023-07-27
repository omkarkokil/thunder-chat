"use client";

import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";
import React from "react";

const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div>
      <EmptyState />
    </div>
  );
};

export default Home;
