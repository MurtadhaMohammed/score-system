"use client";

import { Button, Card, Spacer, User } from "@nextui-org/react";
import { useAppStore } from "@/stores/app";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { axios } from "@/lib";

const StudentCard = ({ data, type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { course, setUpdate } = useAppStore();
  let { score, student } = data;
  const [newScore, setNewScore] = useState(score || 0);
  const [loading, setLoading] = useState(false);

  const { quiz, task } = course.grade;

  const handleEdit = () => {
    setLoading(true);
    axios.put(`/studentActivitiy/${data.id}`, { score: newScore }).then((r) => {
      setLoading(false);
      if (r.data.error) return;
      else {
        data = r.data.studentActivitiy;
        setIsEdit(false);
        setUpdate()
      }
    });
  };

  if ((!data.name || !data.phone) && !student) return null;

  return (
    <Card
      className="p-5 w-full"
      shadow="sm"
      isHoverable
      style={{ cursor: "pointer" }}
      onDoubleClick={() => setIsEdit(true)}
    >
      {isEdit && (
        <div className="absolute top-6 right-20">
          <div className="flex">
            <Button
              isIconOnly
              onClick={handleEdit}
              color="primary"
              size="sm"
              aria-label="Like"
              isLoading={loading}
            >
              {!loading && <FaSave />}
            </Button>
            <Spacer y={4} />
            <Button
              isIconOnly
              onClick={() => {
                setNewScore(score);
                setIsEdit(false);
              }}
              color="default"
              size="sm"
              aria-label="Like"
            >
              <FaTimes />
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <User
          avatarProps={{ src: "" }}
          name={data?.name?.substr(0, 14) ?? data?.student?.name?.substr(0, 14)}
          description={data.phone ?? data.student.phone}
        />
        <b className="text-yellow-500 text-2xl">
          <span>
            {isEdit ? (
              <input
                className="w-8 text-center rounded-md"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
              />
            ) : (
              newScore
            )}
          </span>
          /<span className="text-sm">{type === "QUIZ" ? quiz : task}</span>
        </b>
      </div>
    </Card>
  );
};

export default StudentCard;
