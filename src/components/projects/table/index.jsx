import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Avatar,
  AvatarGroup,
  Button,
  Switch,
  Spinner,
  Chip,
} from "@nextui-org/react";

import { BiEdit, BiTrash } from "react-icons/bi";
import { useHomeStore } from "../store";
import { courses, projects, students } from "@/fake";
import { useAppStore } from "@/store";

export const PureTable = ({ head = null }) => {
  const {
    setIsModal,
    setName,
    setPhone,
    setId,
    setEmail,
    setBirthDate,
    setImg,
  } = useHomeStore();
  const { course, loading } = useAppStore();
  let courseInfo = courses.find((el) => el?.id === Number(course));



  const handleEdit = (row) => {
    setId(row?.id);
    setName(row?.name);
    setPhone(row?.phone);
    setEmail(row?.email);
    setBirthDate(row?.birthDate);
    setImg(row?.img);
    setIsModal(true);
  };

  return (
    <div className="max-w-6xl m-auto pl-6 pr-6">
      <Card className="p-6">
        {head && head}
        <Table aria-label="Example static collection table" removeWrapper isStriped>
          <TableHeader>
            <TableColumn>Details</TableColumn>
            <TableColumn>Assigned</TableColumn>
            <TableColumn>Score</TableColumn>
            <TableColumn>Active</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              loading ? <Spinner label="Loading..." /> : "No rows to display."
            }
          >
            {course &&
              projects?.map((project) => (
                <TableRow key={project?.id}>
                  <TableCell className=" max-w-sm">
                    <div className="flex flex-col gap-2">
                      <b className="text-md whitespace-nowrap font-bold">
                        # {project?.title}
                      </b>
                      <span className="text-gray-600  text-sm">
                        {project?.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AvatarGroup isBordered>
                      {project?.students?.map((el) => (
                        <Avatar size="sm" key={el?.id} src={el?.img} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {project?.score ? (
                      <b className="text-yellow-500 text-3xl">
                        {project?.score}/
                        <span className=" text-sm">
                          {courseInfo?.score?.project}
                        </span>
                      </b>
                    ) : (
                      <Chip variant="flat" size="sm" color="secondary">
                        Inprogress
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      size="sm"
                      defaultSelected={project?.active}
                      aria-label="Automatic updates"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 w-full justify-end">
                      <Button
                        variant="bordered"
                        size="sm"
                        isIconOnly
                        onClick={() => handleEdit(project)}
                      >
                        <BiEdit size={18} />
                      </Button>
                      <Button
                        variant="bordered"
                        size="sm"
                        color="danger"
                        isIconOnly
                        disabled
                      >
                        <BiTrash size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
