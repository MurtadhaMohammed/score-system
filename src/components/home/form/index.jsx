import { useRouter } from "next/navigation";
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
import { useStudentStore } from "../store";
import { useAppStore, useStudentCourse } from "@/stores";
import { axios } from "@/lib";

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
  } = useStudentStore();
  const { course, loading, setCourses, setLoading } = useAppStore();
  const { setStudentCourse } = useStudentCourse();

  const handleSubmit = async () => {
    setLoading(true);
    let data = {
      name,
      birthDate,
      phone,
      email,
      img,
      course,
    };

    if (id) await axios.put(`/student/${id}`, data);
    else await axios.post("/student", data);

    const studentCourses = await axios.get(`/student?courseId=${course.id}`);
    setStudentCourse(studentCourses.data.data);

    setLoading(false);
    setIsModal(false);
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
              errorMessage={img && !img.includes("http") && "Invalid Url"}
              validationState={img && !img.includes("http") && "invalid"}
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
              errorMessage={
                birthDate &&
                !birthDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/) &&
                "Invalid Date"
              }
              validationState={
                birthDate &&
                !birthDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/) &&
                "invalid"
              }
            />
            <Input
              variant="bordered"
              type="email"
              label="Email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={
                email &&
                !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) &&
                "Invalid Email"
              }
              validationState={
                email &&
                !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) &&
                "invalid"
              }
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
            color="primary"
            onPress={handleSubmit}
            disabled={loading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
