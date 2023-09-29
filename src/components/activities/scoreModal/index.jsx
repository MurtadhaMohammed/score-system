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
import { useActivitiesStore } from "../store";
// import { useAppStore } from "@/store";
import { chipColor } from "..";
import StudentCard from "../studentCard";
import JsonToCSV from "@/helper/JsonToCSV";
import dayjs from "dayjs";

export const ScroeModal = () => {
  const { isScoreModal, setIsScoreModal, type, title, date, activities } =
    useActivitiesStore();

  const selectedActivity = activities.find((el) => el.title === title);

  // const { StudentActivitiy } = activities;

  const handleSubmit = () => {
    let filename = `${title} - ${dayjs(date).format("YYYY-MM-DD")}`;
    JsonToCSV(scoreList, filename);
  };

  return (
    <Modal
      size="5xl"
      isOpen={isScoreModal}
      onOpenChange={setIsScoreModal}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b-1 border-b-slate-100 pt-4 pb-4">
          <b>{title}</b>
          <Chip variant="dot" color={chipColor[type]} size="md">
            {type}
          </Chip>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
            {selectedActivity &&
              selectedActivity.StudentActivitiy.map((el, i) => (
                <StudentCard key={i} data={el} type={type} />
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
