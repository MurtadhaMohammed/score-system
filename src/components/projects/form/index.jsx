"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  SelectItem,
  Select,
  Textarea,
} from "@nextui-org/react";
import { useProjectStore } from "../store";
import { useAppStore } from "@/store";

export const PureForm = () => {
  const {
    isModal,
    setIsModal,
    id,
    title,
    description,
    setDescription,
    setTitle,
    setId,
    reset,
  } = useProjectStore();
  const { course } = useAppStore();

  const handleSubmit = () => {
    let data = {title, description, course};
    if (id) console.log("Edit : ", data);
    else console.log("Create : ", data);
  };

  return (
    <Modal size="lg" isOpen={isModal} onOpenChange={setIsModal} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {id ? "Edit" : "New"} Project
        </ModalHeader>
        <ModalBody>
          <Input
            variant="bordered"
            type="text"
            label="Title"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="bordered"
            type="text"
            label="Description"
            placeholder="Project Details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter className="mt-6">
          <Button
            color="danger"
            variant="light"
            onPress={() => {
              setIsModal(false);
              reset();
            }}
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
