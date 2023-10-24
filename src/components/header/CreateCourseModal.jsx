import { useAppStore } from "@/stores";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";

export default function CreateCourseModal({ isOpen, handleClose }) {
  const { setCourses } = useAppStore();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState();
  const [quiz, setQuiz] = useState();
  const [task, setTask] = useState();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    try {
      if (quiz + attendance + task + project !== 100 || !name.length) return;
      setIsLoading(true);

      await axios.post("/api/course", {
        name,
        attendance,
        quiz,
        task,
        project,
      });

      const { data } = await axios.get("/api/course");
      setCourses(data.data);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        onOpenChange={handleClose}
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Create Course</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                title="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex flex-col gap-4">
                <div className="bold text-lg">Course Grade</div>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Attendance"
                    value={attendance}
                    onChange={(e) => setAttendance(Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Quiz"
                    value={quiz}
                    onChange={(e) => setQuiz(Number(e.target.value))}
                  />
                </div>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    value={task}
                    onChange={(e) => setTask(Number(e.target.value))}
                    placeholder="Task"
                  />
                  <Input
                    type="number"
                    placeholder="Project"
                    value={project}
                    onChange={(e) => setProject(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-4">
              <Button auto onClick={handleClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={
                  quiz + attendance + task + project !== 100 || !name.length
                }
                isLoading={isLoading}
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
