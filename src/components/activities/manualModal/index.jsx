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
import StudentCard2 from "../studentCard2";
import { axios } from "@/lib";
import { useEffect, useState } from "react";

export const ManualModal = () => {
  const {
    isManualModal,
    setIsManualModal,
    title,
    type,
    typeQuery,
    id,
    setScoreData,
    setActivities,
    setManualList,
    manualList,
  } = useActivitiesStore();

  const { course, loading, setLoading } = useAppStore();
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!course) return;

    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`/student?courseId=${course.id}`);
      setStudents(res.data.data);
      setManualList(
        res.data.data.map((el) => {
          return {
            id: el.id,
            phone: el.phone,
            score: 0,
          };
        })
      );
      setLoading(false);
    };

    if (isManualModal) getData().then();
  }, [isManualModal]);

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

    axios.post(`/studentActivitiy/${id}`, { data: manualList }).then((r) => {
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
          setIsManualModal(false);
        });
    });
  };

  const handleScore = (val) => {
    let newArr = [...manualList];
    newArr[val.index].score = val.score;
    setManualList(newArr);
  };

  const handleClose = () => {
    setLoading(false);
    setIsManualModal(false);
    setScoreData([]);
  };

  return (
    <Modal
      size="full"
      isOpen={isManualModal}
      onOpenChange={setIsManualModal}
      // scrollBehavior="inside"
      // backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex  gap-2 border-b-1 border-b-slate-100 pt-4 pb-4">
          <Chip variant="dot" color={chipColor[type]} size="md">
            {type}
          </Chip>
          <b>{title}</b>
        </ModalHeader>
        <ModalBody style={{ overflow: "auto" }}>
          <div className="grid grid-cols-4 gap-4 mt-4 mb-4">
            {students.map((el, i) => (
              <StudentCard2
                key={i}
                index={i}
                data={el}
                type={type}
                manual={true}
                onChange={handleScore}
              />
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
