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
import { useAppStore } from "@/store";
import { chipColor } from "..";
import StudentCard from "../studentCard";

export const ImportModal = () => {
  const { isImportModal, setIsImportModal, title, type, scoreData } =
    useActivitiesStore();
  const { course } = useAppStore();

  const handleSubmit = () => {
    console.log(scoreData);
  };

  return (
    <Modal
      size="4xl"
      isOpen={isImportModal}
      onOpenChange={setIsImportModal}
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
            {scoreData?.map((el, i) => (
              <StudentCard key={i} data={el} type={type} />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="border-t-1 border-t-slate-100">
          <Button
            color="danger"
            variant="light"
            onPress={() => setIsImportModal(false)}
          >
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
