"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { useHomeStore } from "../store";
import { useAppStore } from "@/store";

export const PureForm = () => {
  const {
    isModal,
    setIsModal,
    id,
    name,
    birthDate,
    phone,
    email,
    img,
    setName,
    setPhone,
    setEmail,
    setBirthDate,
    setImg,
    reset,
  } = useHomeStore();
  const { course } = useAppStore();

  const handleSubmit = () => {
    let data = {
      name,
      birthDate,
      phone,
      email,
      img,
      course,
    };
    if (id) console.log("Edit : ", data);
    else console.log("Create : ", data);
  };

  return (
    <Modal size="lg" isOpen={isModal} onOpenChange={setIsModal} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {id ? "Edit" : "New"} Student
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center gap-4">
            <Avatar size="lg" isBordered src={img} />
            <Input
              variant="bordered"
              className="flex-1"
              type="text"
              label="Image Url"
              placeholder="https://xxxxxx.png"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              variant="bordered"
              type="text"
              label="Name"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className=" w-2/3"
              variant="bordered"
              type="text"
              label="Phone"
              placeholder="07xxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Input
              variant="bordered"
              type="text"
              label="Birth Date"
              placeholder="Ex: 1999/04/30"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <Input
              variant="bordered"
              type="email"
              label="Email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
