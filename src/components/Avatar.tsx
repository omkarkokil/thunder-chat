"use client";
import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";

interface avatarProps {
  user?: User;
}

const Avatar: FC<avatarProps> = ({ user }) => {
  const { members } = useActiveList();

  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-auto h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="Avatar"
          height={50}
          width={50}
          src={user?.image || "/images/placeholder.jpg"}
        />
      </div>

      {isActive ? (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      ) : null}
    </div>
  );
};

export default Avatar;
