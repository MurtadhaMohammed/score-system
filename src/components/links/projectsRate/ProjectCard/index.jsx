"use client";

import { Card, Chip, Avatar } from "@nextui-org/react";
import { HiStar } from "react-icons/hi";

export const ProjectCard = ({ project }) => {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-start">
        <b>{project?.title}</b>
        <b className="text-yellow-500 text-2xl flex items-center gap-2">
          {project?.rating}
          <HiStar size={26} />
        </b>
      </div>
      <p className="text-sm text-gray-500 text-ellipsis  overflow-hidden whitespace-nowrap">{project?.description}</p>
      <div className="flex gap-2 flex-wrap mt-2">
        {project?.students?.map((el, i) => (
          <Chip
            key={i}
            variant="flat"

            avatar={<Avatar  name={el?.name} src={el?.img} />}
          >
            {el?.name}
          </Chip>
        ))}
      
      </div>
    </Card>
  );
};
