"use client";

import { Button, Input } from "@nextui-org/react";
import { RiSearch2Line } from "react-icons/ri";
import { useHomeStore } from "../store";

export const Head = () => {
  const { setIsModal, reset } = useHomeStore();
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

      <Button
        onClick={() => {
          reset();
          setIsModal(true);
        }}
        color="primary"
      >
        + New Project
      </Button>
    </div>
  );
};
