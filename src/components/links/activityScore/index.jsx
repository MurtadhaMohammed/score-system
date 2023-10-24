"use client";

import { useEffect, useState } from "react";
import { chipColor } from "@/components/activities";
import { Chip } from "@nextui-org/react";
import StudentCard from "./studentCard";
import { TbCalendarTime } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { useAppStore } from "@/stores";
import { axios } from "@/lib";
import dayjs from "dayjs";
import { SkeletonLinks } from "..";

function largestScore(arr = []) {
  arr = arr.sort((a, b) => Number(b?.score) - Number(a?.score));
  let max = arr[0];
  if (Number(max.score) === 0) return;
  return Number(max.score);
}

export const ActivityScore = ({ data }) => {
  const [activityInfo, setActivityInfo] = useState(null);
  const { loading, setLoading } = useAppStore();
  let { activity, course } = data.score;
  let { StudentActivitiy, title, type, date } = activityInfo || {};

  let list = activityInfo
    ? [...StudentActivitiy?.sort((a, b) => Number(b?.score) - Number(a?.score))]
    : [];

  useEffect(() => {
    setLoading(true);
    axios.get(`/activity/${activity?.id}`).then((res) => {
      setActivityInfo(res?.data?.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLinks total={data?.totalStudents} />;

  return (
    <div className="max-w-8xl m-auto pl-6 pr-6 md:pl-10 md:pr-10">
      <div className="flex items-end justify-between pt-8 md:pt-14 flex-wrap">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-4 items-end">
            <Chip variant="dot" color={chipColor[type]} size="md">
              {type}
            </Chip>
            <div className="flex gap-2 items-center">
              <TbCalendarTime className="text-gray-500 -mt-1" size={18} />
              <p className="text-gray-500">
                {dayjs(date).format("YYYY, ddd MM")}
              </p>
            </div>
          </div>
          <b className="sm:text-lg">{title || ""}</b>
        </div>
        <div className="flex gap-2 items-center mr-2 md:ml-4">
          <PiStudent className="text-gray-500 -mt-1" size={18} />
          <p className="text-gray-500">
            <b>{StudentActivitiy?.length}</b> of Students
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 pb-8">
        {list?.map((el, i) => (
          <StudentCard
            key={i}
            course={course}
            data={el}
            type={type}
            isCrown={Number(el?.score) === largestScore(list)}
          />
        ))}
      </div>
    </div>
  );
};
