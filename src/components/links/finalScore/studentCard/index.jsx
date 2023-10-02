"use client";

import { Card, User } from "@nextui-org/react";
import { PiCrownBold } from "react-icons/pi";

const StudentCard = ({ data, course, isCrown = false }) => {
  let { score, name, email, img } = data;
  let { quiz, task, project, evaScore } = course?.grade || {};
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
          name={name}
          description={email || "has no email !"}
        />
        <b className="text-yellow-500 text-2xl">
          {score}/
          <span className="text-sm">{task + quiz + project + evaScore}</span>
        </b>
      </div>
    </Card>
  );
};

export default StudentCard;
