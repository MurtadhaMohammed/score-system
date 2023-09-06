"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import { useActivitiesStore, useProjectStore } from "../store";
// import { useAppStore } from "@/store";
import { courses, scoreList } from "@/fake";

import JsonToCSV from "@/helper/JsonToCSV";
import StudentCard from "../studentCard";
import { useAppStore } from "@/store";

export const ScroeModal = () => {
  const { course } = useAppStore();
  const { isScoreModal, setIsScoreModal, title } = useProjectStore();
  let courseInfo = courses.find((el) => el?.id === Number(course));

  const handleSubmit = () => {
    let filename = `${title} - ${courseInfo?.title}`;
    JsonToCSV(scoreList.slice(0, 2), filename);
  };

  return (
    <Modal
      size="md"
      isOpen={isScoreModal}
      onOpenChange={setIsScoreModal}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b-1 border-b-slate-100 pt-4 pb-4">
          <b>{title}</b>
          <Chip variant="dot" color={"success"} size="md">
            Project
          </Chip>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-4 mt-4 mb-4">
            {scoreList?.slice(0, 2)?.map((el, i) => (
              <StudentCard key={i} data={el} />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="border-t-1 border-t-slate-100">
          <Button
            color="danger"
            variant="light"
            onPress={() => setIsScoreModal(false)}
          >
            Close
          </Button>
          <Button color="secondary" onPress={handleSubmit}>
            Download CSV
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
