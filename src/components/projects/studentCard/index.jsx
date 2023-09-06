"use client";

import { Card, User } from "@nextui-org/react";
import { useAppStore } from "@/store";
import { courses } from "@/fake";

const StudentCard = ({ data }) => {
  const { course } = useAppStore();
  let { score, name, phone, img } = data;
  let courseInfo = courses.find((el) => el?.id === Number(course));
  let { quiz, task } = courseInfo?.score;
  return (
    <Card className="p-5 w-full" shadow="sm">
      <div className="flex justify-between items-center">
        <User avatarProps={{ src: img }} name={name} description={phone} />
        <b className="text-yellow-500 text-3xl">
          {score}/
          <span className=" text-sm">{40}</span>
        </b>
      </div>
    </Card>
  );
};

export default StudentCard;
