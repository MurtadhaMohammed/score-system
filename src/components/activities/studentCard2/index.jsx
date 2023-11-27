"use client";

import { Button, Card, Spacer, User } from "@nextui-org/react";
import { useAppStore } from "@/stores/app";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { axios } from "@/lib";
import { useActivitiesStore } from "../store";

const StudentCard2 = ({ index, data, type, onChange }) => {
  const { course, setUpdate } = useAppStore();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const { quiz, task } = course.grade;

  const handleChangeScroe = (e) => {
    let { value } = e.target;
    setScore(value);
    onChange({ index, score: Number(value) });
  };

  if (!data.name || !data.phone) return null;

  return (
    <Card className="p-5 w-full" shadow="sm" isHoverable>
      <div className="flex justify-between items-center">
        <User
          avatarProps={{ src: "" }}
          name={data?.name?.substr(0, 14) ?? data?.student?.name?.substr(0, 14)}
          description={data.phone ?? data.student.phone}
        />
        <b className="text-yellow-500 text-2xl">
          <input
            className="w-8 text-center rounded-md"
            value={score}
            onChange={handleChangeScroe}
          />
          /<span className="text-sm">{type === "QUIZ" ? quiz : task}</span>
        </b>
      </div>
    </Card>
  );
};

export default StudentCard2;
