"use client";

import { Card, User } from "@nextui-org/react";
import { PiCrownBold } from "react-icons/pi";

const StudentCard = ({ data }) => {
  let { name, email, img } = data;

  return (
    <Card className="p-5 min-w-[240px] scale-150" shadow="sm">
      <div className="absolute top-2 left-4  -rotate-30">
        <PiCrownBold size={18} className="text-yellow-500" />
      </div>

      <div className="flex justify-between items-center">
        <User
          avatarProps={{
            src: img,
            isBordered: true,
            //size: 'lg',
            color: "warning",
          }}
          name={name || ". . ."}
          description={email || "has no email !"}
        />
      </div>
    </Card>
  );
};

export default StudentCard;
