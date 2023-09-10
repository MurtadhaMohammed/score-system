"use client";

import { chipColor } from "@/components/activities";
import { activitiesList, scoreList } from "@/fake";
import { Chip } from "@nextui-org/react";
import StudentCard from "./studentCard";

function largestScore(arr = []) {
  arr = arr.sort((a, b) => Number(b?.score) - Number(a?.score));
  let max = arr[0];
  return Number(max.score);
}

export const ActivityScore = () => {
  let { title, type } = activitiesList[0];

  let list =
    [...scoreList?.sort((a, b) => Number(b?.score) - Number(a?.score))] || [];

  return (
    <div className="max-w-8xl m-auto pl-6 pr-6 md:pl-10 md:pr-10">
      <div className="flex gap-2 items-center mt-16">
        <Chip variant="dot" color={chipColor[type]} size="md">
          {type}
        </Chip>
        <b>{title}</b>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 pb-8">
        {list?.map((el, i) => (
          <StudentCard
            key={i}
            data={el}
            type={type}
            course={1}
            isCrown={Number(el?.score) === largestScore(list)}
          />
        ))}
        {list?.map((el, i) => (
          <StudentCard
            key={i}
            data={el}
            type={type}
            course={1}
            isCrown={Number(el?.score) === largestScore(list)}
          />
        ))}
        {list?.map((el, i) => (
          <StudentCard
            key={i}
            data={el}
            type={type}
            course={1}
            isCrown={Number(el?.score) === Number(largestScore(list))}
          />
        ))}
      </div>
    </div>
  );
};
