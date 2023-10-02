"use client";

import { Chip } from "@nextui-org/react";
import StudentCard from "./studentCard";
import { TbCalendarTime } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { useAppStore } from "@/stores";
import { useEffect, useState } from "react";
import { axios } from "@/lib";
import { SkeletonLinks } from "..";
import dayjs from "dayjs";

function largestScore(arr = []) {
  arr = arr.sort((a, b) => Number(b?.score) - Number(a?.score));
  let max = arr[0];
  if (Number(max.score) === 0) return;
  return Number(max.score);
}

function studentsList({ students, totalActivity }) {
  let list = [];

  for (const s of students) {
    let activitiyScore = s.StudentActivitiy.filter(
      (el) => el?.activitiy?.active
    ).reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);

    activitiyScore = activitiyScore / totalActivity;

    let projectScore = 0;
    if (s.StduentProject[0]?.project?.active) {
      projectScore = s.StduentProject[0]?.score;
    }
    list.push({
      ...s,
      score: (projectScore + activitiyScore + s.evaScore).toFixed(1),
    });
  }

  return list?.sort((a, b) => Number(b?.score) - Number(a?.score)) || [];
}

export const FinalScore = ({ data }) => {
  const { loading, setLoading, createdAt } = useAppStore();
  const [list, setList] = useState([]);
  const { courseId, course } = data?.score;

  useEffect(() => {
    setLoading(true);
    axios.get(`/score/final/${courseId}`).then((res) => {
      setList(studentsList(res?.data?.data));
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLinks total={data?.totalStudents} />;

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
              <p className="text-gray-500"> {dayjs(createdAt).format("YYYY, ddd MM")}</p>
            </div>
          </div>
          <b className="sm:text-lg">
            Final evaluation of students (Tasks & Quizzes & Projects)
          </b>
        </div>
        <div className="flex gap-2 items-center mr-2 md:ml-4">
          <PiStudent className="text-gray-500 -mt-1" size={18} />
          <p className="text-gray-500">
            <b>{list?.length}</b> of Students
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6 pb-8">
        {list?.map((el, i) => (
          <StudentCard
            key={i}
            data={el}
            course={course}
            isCrown={Number(el?.score) === largestScore(list)}
          />
        ))}
      </div>
    </div>
  );
};
