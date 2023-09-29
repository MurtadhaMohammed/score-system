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
  Spinner,
} from "@nextui-org/react";
import { RiSearch2Line } from "react-icons/ri";
import { LiaUsersSolid } from "react-icons/lia";
import { useAppStore } from "@/stores";
import { useProjectStore } from "../store";
import StudentCard from "../studentCard";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { axios } from "@/lib";

export const ScroeModal = () => {
  const {
    isScoreModal,
    setIsScoreModal,
    title,
    setSelectedStudents,
    selectedStudents,
    id,
    setProjects,
  } = useProjectStore();

  const { course, loading, setLoading } = useAppStore();

  const [value, setValue] = useState(null);

  const [isProjectLoading, setIsProjectLoading] = useState(false);

  const [studentIds, setStudentIds] = useState([]);

  const students = course?.student || [];

  const handleSubmit = async () => {
    setLoading(true);

    await axios.post(`/assignStudentToProject`, {
      students: selectedStudents,
      projectId: id,
    });

    const { data: projectsData } = await axios.get(
      `/projects?courseId=${course.id}`
    );

    setProjects(projectsData.data);

    setLoading(false);
    setIsScoreModal(false);
  };

  const handleAddStudent = () => {
    let student = students?.find((el) => el?.id === value);

    setStudentIds([...studentIds, value]);

    setSelectedStudents([...selectedStudents, { ...student, score: 0 }]);
  };

  useEffect(() => {
    const getData = async () => {
      setIsProjectLoading(true);

      const { data } = await axios.get(`/projects/${id}`);

      const ids = data.data?.students?.map((el) => el?.id);

      console.log("selected API", data.data?.student);

      setSelectedStudents(data.data?.student);

      setStudentIds(ids);

      setIsProjectLoading(false);
    };

    getData().then();
  }, [id]);

  useEffect(() => {
    let ids = selectedStudents?.map((el) => el?.id);

    setStudentIds(ids);
  }, [selectedStudents]);

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
              {students.map((s) => (
                <SelectItem key={s.id} textValue={s.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={s.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={s.img}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{s.name}</span>
                      <span className="text-tiny text-default-400">
                        {s.phone}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
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
          {!isProjectLoading && (
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
          )}
          {isProjectLoading && <Spinner label="Loading..." />}
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
          <Button isLoading={loading} color="primary" onPress={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
