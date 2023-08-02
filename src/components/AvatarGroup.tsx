import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

const AvatarGroup = ({ users = [] }: { users: User[] }) => {
  const slicedUser = users?.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {slicedUser.map((user, i) => (
        <div
          key={i}
          className={`absolute   inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${
            positionMap[i as keyof typeof positionMap]
          } `}
        >
          <Image
            alt="avatar"
            fill
            src={user?.image || "/images/placeholder.jpg"}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
