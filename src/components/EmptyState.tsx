import React from "react";

const EmptyState = () => {
  return (
    <div
      className="
        px-4
        py-10
        sm:py-6
        lg:py-8
        h-full
        flex
        justify-center
        items-center
        bg-gray-100
        "
    >
      <div className="text-center items-center flex flex-col">
        <h3>Select a chat or start a conversation</h3>
      </div>
    </div>
  );
};

export default EmptyState;
