import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Avatar,
  Button,
  Switch,
  Spinner,
} from "@nextui-org/react";

import { BiEdit } from "react-icons/bi";
import { useStudentStore } from "../store";
// import { students } from "@/fake";
import { useAppStore } from "@/stores";
import { axios } from "@/lib";
import DeleteButton from "@/components/buttons/deleteButton";

export const PureTable = ({ head = null }) => {
  const { loading, setLoading , setUpdate} = useAppStore();

  const {
    setIsModal,
    setName,
    setPhone,
    setId,
    setEmail,
    setBirthDate,
    setImg,
    students,
  } = useStudentStore();

  const handleEdit = (row) => {
    setId(row?.id);
    setName(row?.name);
    setPhone(row?.phone);
    setEmail(row?.email);
    setBirthDate(row?.birthDate);
    setImg(row?.img);
    setIsModal(true);
  };

  const onSwitchClick = async (id) => {
    setLoading(true);
    await axios.patch(`/student/${id}`);

    setUpdate();
    setLoading(false);
  };

  return (
    <div className="max-w-6xl m-auto pl-6 pr-6 pb-20">
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
            {students &&
              students?.map((student) => (
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
                      onClick={() => onSwitchClick(student.id)}
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
                      <DeleteButton
                        link={`/student/${student.id}`}
                        fetchData={()=> setUpdate()}
                      />
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
