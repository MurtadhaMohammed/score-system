"use client";

import { useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { RiSearch2Line } from "react-icons/ri";
import { axios } from "@/lib";
import { useActivitiesStore } from "../store";
import { useAppStore } from "@/stores";

export const Head = () => {
  const { course, setLoading } = useAppStore();

  const { setIsModal, reset, setActivities, typeQuery, setTypeQuery } =
    useActivitiesStore();

  useEffect(() => {
    if (!course) return;

    const getData = async () => {
      setLoading(true);

      const res = await axios.get(
        `/activity?courseId=${course.id}&type=${typeQuery}`
      );

      setActivities(res.data.data);

      setLoading(false);
    };

    getData().then();
  }, [typeQuery]);

  return (
    <div className="flex justify-between items-center pb-4">
      <Input
        isClearable
        radius="lg"
        className="w-80"
        variant="bordered"
        classNames={{
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            // "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <RiSearch2Line className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />

      <div className="flex gap-4">
        <Select
          //label="Course"
          placeholder="Type"
          size="xs"
          className="w-24"
          variant="flat"
          isClearable
          value={typeQuery}
          onChange={(e) => setTypeQuery(e.target.value)}
        >
          <SelectItem key={"QUIZ"} value={"QUIZ"}>
            Quiz
          </SelectItem>
          <SelectItem key={"TASK"} value={"TASK"}>
            Task
          </SelectItem>
        </Select>
        <Button
          onClick={() => {
            reset();
            setIsModal(true);
          }}
          color="primary"
        >
          + New Activity
        </Button>
      </div>
    </div>
  );
};
