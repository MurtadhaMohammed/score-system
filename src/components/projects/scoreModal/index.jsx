"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  SelectItem,
  Select,
  Avatar,
} from "@nextui-org/react";
import { RiSearch2Line } from "react-icons/ri";
import { LiaUsersSolid } from "react-icons/lia";
import { useProjectStore } from "../store";
import { students } from "@/fake";

import StudentCard from "../studentCard";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";

export const ScroeModal = () => {
  const {
    isScoreModal,
    setIsScoreModal,
    title,
    setSelectedStudents,
    selectedStudents,
  } = useProjectStore();
  const [value, setValue] = useState(null);

  const handleSubmit = () => {
    console.log(selectedStudents);
  };

  const handleAddStudent = () => {
    let student = students?.find((el) => el?.id === Number(value));
    setSelectedStudents([...selectedStudents, { ...student, score: 0 }]);
    setValue(null);
  };

  const renderList = () => {
    let list = students?.filter(
      (el) => !selectedStudents?.find((item) => item?.id === el?.id)
    );

    return list;
  };

  return (
    <Modal
      size="md"
      isOpen={isScoreModal}
      onOpenChange={(e) => {
        setSelectedStudents([]);
        setIsScoreModal(e);
      }}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 border-b-1 border-b-slate-100 pt-4 pb-4">
          <div className="flex gap-4">
            <Chip variant="dot" color={"success"} size="md">
              Project
            </Chip>
            <b>{title}</b>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Select
              items={renderList()}
              startContent={<RiSearch2Line color="#666" />}
              size="sm"
              variant="flat"
              isClearable
              placeholder="Select Students"
              selectedKeys={[value]}
              onChange={(e) => setValue(e.target.value)}
            >
              {(student) => (
                <SelectItem key={student.id} textValue={student.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={student.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={student.img}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{student.name}</span>
                      <span className="text-tiny text-default-400">
                        {student.phone}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Button
              onClick={handleAddStudent}
              disabled={!value}
              size="lg"
              isIconOnly
              radius="sm"
              color="secondary"
            >
              <LuPlus size={24} />
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-4 mt-4 mb-4">
            {selectedStudents?.length === 0 && (
              <div className="flex items-center justify-center flex-col gap-2 p-10 text-gray-400">
                <LiaUsersSolid size={46} />
                <p>Select Team</p>
              </div>
            )}
            {selectedStudents?.map((el, i) => (
              <StudentCard key={i} data={el} />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="border-t-1 border-t-slate-100">
          <Button
            color="danger"
            variant="light"
            onPress={() => {
              setSelectedStudents([]);
              setIsScoreModal(false);
            }}
          >
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
