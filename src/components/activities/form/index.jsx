"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useActivitiesStore } from "../store";
import { useAppStore } from "@/stores/app";
import { axios } from "@/lib";

export const PureForm = () => {
  const {
    isModal,
    setIsModal,
    id,
    title,
    info,
    date,
    setTitle,
    setInfo,
    setDate,
    reset,
    type,
    setType,
  } = useActivitiesStore();
  const { course, setLoading, loading, setUpdate } = useAppStore();

  const handleSubmit = async () => {
    let data = {
      title,
      info,
      date,
      courseId: course.id,
      type,
    };

    setLoading(true);

    if (id) await axios.put(`/activity/${id}`, data);
    else await axios.post("/activity", data);

    setUpdate();
    setLoading(false);
    setIsModal(false);
  };

  return (
    <Modal size="lg" isOpen={isModal} onOpenChange={setIsModal} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {id ? "Edit" : "New"} Quiz
        </ModalHeader>
        <ModalBody>
          <Input
            variant="bordered"
            type="text"
            label="Title"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="bordered"
            type="text"
            label="Info"
            placeholder="Quiz Details"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          <div className="flex gap-4">
            <Select
              label="Type"
              placeholder="Type"
              // size="xs"
              className="w-40"
              variant="bordered"
              isClearable
              // selectedKeys={type}
              // defaultValue={ty}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <SelectItem key={"QUIZ"} value={"QUIZ"}>
                Quiz
              </SelectItem>
              <SelectItem key={"TASK"} value={"TASK"}>
                Task
              </SelectItem>
            </Select>
            <Input
              variant="bordered"
              type="text"
              label="Start Date"
              placeholder="Ex: 2023/04/20"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
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
          <Button
            isLoading={loading}
            isDisabled={loading}
            color="primary"
            onPress={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
