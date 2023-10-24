"use client";

import { Chip } from "@nextui-org/react";
import { TbCalendarTime } from "react-icons/tb";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { ProjectCard } from "./ProjectCard";
import { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import { SkeletonLinks } from "..";
import { axios } from "@/lib";
import dayjs from "dayjs";

export const ProjectsRate = ({ data }) => {
  const { courseId, createdAt } = data?.score;
  const [list, setList] = useState([]);
  const { loading, setLoading } = useAppStore();

  useEffect(() => {
    setLoading(true);
    axios.get(`/projects?courseId=${courseId}&active=true`).then((res) => {
      setList(res?.data?.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <SkeletonLinks total={data?.totalStudents} />;

  return (
    <div className="max-w-8xl m-auto pl-6 pr-6 md:pl-10 md:pr-10">
      <div className="flex items-end justify-between pt-8 md:pt-14 flex-wrap">
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-4 items-end">
            <Chip variant="dot" color={"danger"} size="md">
              Ratings
            </Chip>
            <div className="flex gap-2 items-center">
              <TbCalendarTime className="text-gray-500 -mt-1" size={18} />
              <p className="text-gray-500">{dayjs(createdAt).format("YYYY, ddd MM")}</p>
            </div>
          </div>
          <b className="sm:text-lg">Total Ratings for Projects.</b>
        </div>
        <div className="flex gap-2 items-center mr-2 md:ml-4">
          <AiOutlineFundProjectionScreen
            className="text-gray-500 mb-1"
            size={18}
          />
          <p className="text-gray-500">
            <b>{list?.length}</b> of Projects
          </p>
        </div>
      </div>

      <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-6 pb-8">
        {list?.map((el, i) => (
          <ProjectCard key={i} project={el} />
        ))}
      </div>
    </div>
  );
};
