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
import { useAppStore } from "@/stores/app";
import { axios } from "@/lib";

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
    setProjects,
  } = useProjectStore();
  const { course, setLoading, loading } = useAppStore();

  const handleSubmit = async () => {
    setLoading(true);
    let data = { title, description, courseId: course.id, documents: [] };

    if (id) await axios.put(`/projects/${id}`, data);
    else await axios.post(`/projects`, data);

    setIsModal(false);

    const { data: projectsData } = await axios.get(
      `/projects?courseId=${course.id}`
    );

    setProjects(projectsData.data);

    setLoading(false);
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
          <Button isLoading={loading} color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
