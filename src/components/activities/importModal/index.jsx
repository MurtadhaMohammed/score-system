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
import { useAppStore } from "@/stores/app";
import { chipColor } from "..";
import StudentCard from "../studentCard";
import { axios } from "@/lib";
import { useState } from "react";

export const ImportModal = () => {
  const {
    isImportModal,
    setIsImportModal,
    title,
    type,
    scoreData,
    typeQuery,
    id,
    setScoreData,
    setActivities,
  } = useActivitiesStore();

  const { course, loading, setLoading } = useAppStore();

  const [error, setError] = useState(null);

  const handleError = (e) => {
    setError(e);
    setLoading(false);

    let timeout = setTimeout(() => {
      console.log("error");
      setError(null);

      clearTimeout(timeout);
    }, 3000);
  };

  const handleSubmit = () => {
    setLoading(true);

    axios.post(`/studentActivitiy/${id}`, { data: scoreData }).then((r) => {
      if (r.data.error) {
        handleError(r.data.error);
        setLoading(false);
        return;
      }
      axios
        .get(`/activity?courseId=${course.id}&type=${typeQuery}`)
        .then((res) => {
          setActivities(res.data.data);
          setLoading(false);
          setIsImportModal(false);
        });
    });
  };

  const handleClose = () => {
    setLoading(false);
    setIsImportModal(false);
    setScoreData([]);
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
          <Button color="danger" variant="light" onPress={handleClose}>
            Close
          </Button>
          <Button
            color="primary"
            isLoading={loading}
            isDisabled={loading}
            onPress={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </ModalContent>
    </Modal>
  );
};
