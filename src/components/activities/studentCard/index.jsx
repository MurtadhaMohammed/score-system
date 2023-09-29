"use client";

import { Card, User } from "@nextui-org/react";
import { useAppStore } from "@/stores/app";

const StudentCard = ({ data, type }) => {
  const { course } = useAppStore();
  console.log(data);
  let { score, student } = data;

  // const { name, phone, img } = student;

  const { quiz, task } = course.grade;

  return (
    <Card className="p-5 w-full" shadow="sm">
      <div className="flex justify-between items-center">
        <User
          avatarProps={{ src: "" }}
          name={data.name ?? data.student.name}
          description={data.phone ?? data.student.phone}
        />
        <b className="text-yellow-500 text-3xl">
          {score}/
          <span className=" text-sm">{type === "QUIZ" ? quiz : task}</span>
        </b>
      </div>
    </Card>
  );
};

export default StudentCard;
