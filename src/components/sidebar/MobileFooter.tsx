"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import React from "react";
import MobileItems from "./MobileItems";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }
  return (
    <div
      className="  fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
        "
    >
      {routes.map((item) => (
        <MobileItems
          key={item.label}
          onClick={item.onClick}
          active={item.active}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
