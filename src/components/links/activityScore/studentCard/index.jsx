"use client";

import { useAppStore } from "@/stores";
import { Card, User } from "@nextui-org/react";
import { PiCrownBold } from "react-icons/pi";

const StudentCard = ({ data, type, course, isCrown = false }) => {
  let { student, score } = data;
  let { name, email, img } = student;
  let { quiz, task } = course?.grade || {};

  return (
    <Card className="p-5 w-full" shadow="sm">
      {isCrown && (
        <div className="absolute top-2 left-4  -rotate-30">
          <PiCrownBold size={18} className="text-yellow-500" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <User
          avatarProps={{
            src: img,
            isBordered: isCrown,
            color: isCrown && "warning",
          }}
          name={<span className="text-trunc">{name}</span>}
          description={
            email?.length > 20
              ? `${email.substr(0, 20)}...`
              : email || "has no email !"
          }
        />
        <b className="text-yellow-500 text-lg">
          {score}/
          <span className="text-sm">{type === "QUIZ" ? quiz : task}</span>
        </b>
      </div>
    </Card>
  );
};

export default StudentCard;
