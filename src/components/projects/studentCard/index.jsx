"use client";

import { Button, Card, User } from "@nextui-org/react";
import { HiOutlineTrash } from "react-icons/hi";
import { useProjectStore } from "../store";
import { useAppStore } from "@/store";
import { courses } from "@/fake";

const StudentCard = ({ data }) => {
  let { id, score, name, phone, img } = data;
  const { selectedStudents, setSelectedStudents } = useProjectStore();
  const { course } = useAppStore();
  let courseInfo = courses.find((el) => el?.id === Number(course));
  let maxScore = courseInfo?.score?.project;

  const handleRemove = () => {
    setSelectedStudents(selectedStudents?.filter((el) => el?.id !== id));
  };

  const handleScore = (e) => {
    let value = e.target.value;
    let index = selectedStudents?.findIndex((el) => el?.id === Number(id));
    let newArr = [...selectedStudents];
    if (Number(value) > maxScore) data.score = maxScore;
    else data.score = Number(value);
    newArr.splice(index, 1, data);
    setSelectedStudents(newArr);
  };

  return (
    <Card className="p-5 w-full" shadow="sm">
      <div className="flex justify-between items-center">
        <User avatarProps={{ src: img }} name={name} description={phone} />
        <div className="flex gap-6 items-center">
          <b className="text-yellow-500 text-2xl  border-r-1 border-r-slate-100 pr-4">
            <input
              className="border-none outline-none bg-slate-100 pt-1 pb-1 rounded-md w-10 text-center mr-2"
              value={score}
              onChange={handleScore}
              max={maxScore}
            />
            /<span className=" text-sm">{maxScore}</span>
          </b>
          <Button
            className="felx-1"
            isIconOnly
            size="sm"
            variant="flat"
            radius="full"
            onClick={handleRemove}
          >
            <HiOutlineTrash />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;
