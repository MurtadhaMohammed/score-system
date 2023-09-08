import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Avatar,
  Chip,
  Button,
  Switch,
  Spinner,
} from "@nextui-org/react";

import { BiEdit, BiTrash } from "react-icons/bi";
import { useHomeStore } from "../store";
import { students } from "@/fake";
import { useAppStore } from "@/store";
import { DeleteStudent } from "@/server/students";

export const PureTable = ({ head = null, data = [] }) => {
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
        <Table aria-label="Example static collection table" removeWrapper>
          <TableHeader>
            <TableColumn>Image</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Brith Date</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Active</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              loading ? <Spinner label="Loading..." /> : "No rows to display."
            }
          >
            {
              data?.map((student) => (
                <TableRow key={student?.id}>
                  <TableCell>
                    <Avatar size="sm" src={student?.img} />
                  </TableCell>
                  <TableCell>
                    <b>{student?.name}</b>
                  </TableCell>
                  <TableCell>{student?.birthDate}</TableCell>
                  <TableCell>{student?.phone}</TableCell>
                  <TableCell>{student?.email}</TableCell>
                  <TableCell>
                    <Switch
                      size="sm"
                      defaultSelected={student?.active}
                      aria-label="Automatic updates"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 w-full justify-end">
                      <Button
                        variant="bordered"
                        size="sm"
                        isIconOnly
                        onClick={() => handleEdit(student)}
                      >
                        <BiEdit size={18} />
                      </Button>
                      <Button
                        onClick={() => DeleteStudent(student.id)}
                        variant="bordered"
                        size="sm"
                        color="danger"
                        isIconOnly
                        
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
