"use client";
import { Chip } from "@nextui-org/react";
import StudentCard from "./studentCard";
import { TbCalendarTime } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { useEffect, useState } from "react";
import { axios } from "@/lib";
import dayjs from "dayjs";
import { useAppStore } from "@/stores";
import { SkeletonLinks } from "..";

function largestScore(arr = []) {
  arr = arr.sort((a, b) => Number(b?.score) - Number(a?.score));
  let max = arr[0];
  if (Number(max.score) === 0) return;
  return Number(max.score);
}

function studentsList({ students }) {
  let list = [];

  for (const s of students) {
    let score = s.StduentProject.filter((el) => el?.project?.active).reduce(
      (acc, curr) => {
        return acc + curr.score;
      },
      0
    );

    list.push({
      ...s,
      score: score,
    });
  }

  return list?.sort((a, b) => Number(b?.score) - Number(a?.score)) || [];
}

export const ProjectsScore = ({ data }) => {
  const { courseId, course, createdAt } = data?.score;
  const [list, setList] = useState([]);
  const { loading, setLoading } = useAppStore();

  useEffect(() => {
    setLoading(true);
    axios.get(`/score/projects/${courseId}`).then((res) => {
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
            <Chip variant="dot" color={"success"} size="md">
              Projects
            </Chip>
            <div className="flex gap-2 items-center">
              <TbCalendarTime className="text-gray-500 -mt-1" size={18} />
              <p className="text-gray-500">{dayjs(createdAt).format("YYYY, ddd MM")}</p>
            </div>
          </div>
          <b className="sm:text-lg">Students evaluations for Projects</b>
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
