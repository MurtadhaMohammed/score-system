"use client";

import { chipColor } from "@/components/activities";
import { scoreList } from "@/fake";
import { Chip } from "@nextui-org/react";
import StudentCard from "./studentCard";
import { TbCalendarTime } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";

function largestScore(arr = []) {
  arr = arr.sort((a, b) => Number(b?.score) - Number(a?.score));
  let max = arr[0];
  return Number(max.score);
}

export const FinalScore = ({ data }) => {
  let list =
    [...data.list?.sort((a, b) => Number(b?.score) - Number(a?.score))] || [];

  return (
    <div className="max-w-8xl m-auto pl-6 pr-6 md:pl-10 md:pr-10">
      <div className="flex items-end justify-between pt-8 md:pt-14 flex-wrap">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-4 items-end">
            <Chip variant="dot" color={"warning"} size="md">
              Final
            </Chip>
            <div className="flex gap-2 items-center">
              <TbCalendarTime className="text-gray-500 -mt-1" size={18} />
              <p className="text-gray-500">2024 , Jun 03</p>
            </div>
          </div>
          <b className="sm:text-lg">
            Final evaluation of students (Tasks & Quizzes & Projects)
          </b>
        </div>
        <div className="flex gap-2 items-center mr-2 md:ml-4">
          <PiStudent className="text-gray-500 -mt-1" size={18} />
          <p className="text-gray-500">
            <b>30</b> of Students
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 pb-8">
        {list?.map((el, i) => (
          <StudentCard
            key={i}
            data={el}
            course={1}
            isCrown={Number(el?.score) === largestScore(list)}
          />
        ))}
      </div>
    </div>
  );
};
