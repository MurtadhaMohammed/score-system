"use client";

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

import { BiEdit } from "react-icons/bi";
import { HiStar } from "react-icons/hi";
import { TbScoreboard } from "react-icons/tb";
import { useProjectStore } from "../store";
import { useAppStore } from "@/stores/app";
import { axios } from "@/lib";
import DeleteButton from "@/components/buttons/deleteButton";

export const PureTable = ({ head = null }) => {
  const {
    setIsScoreModal,
    setIsModal,
    setId,
    setTitle,
    setDescription,
    projects,
  } = useProjectStore();
  const { loading, setLoading, setUpdate } = useAppStore();

  const handleEdit = (row) => {
    setId(row?.id);
    setTitle(row?.title);
    setDescription(row?.description);
    setIsModal(true);
  };
  const handleViewScore = (row) => {
    setId(row?.id);
    setTitle(row?.title);
    setIsScoreModal(true);
  };

  const onSwitchClick = async (id) => {
    setLoading(true);

    await axios.patch(`/projects/${id}`);

    setUpdate();
    setLoading(false);
  };

  return (
    <div className="max-w-6xl m-auto pl-6 pr-6">
      <Card className="p-6">
        {head && head}
        <Table
          aria-label="Example static collection table"
          removeWrapper
          isStriped
        >
          <TableHeader>
            <TableColumn>Details</TableColumn>
            <TableColumn>Rating</TableColumn>
            <TableColumn>Assigned</TableColumn>
            <TableColumn>Active</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              loading ? <Spinner label="Loading..." /> : "No rows to display."
            }
          >
            {projects?.map((project) => (
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
                <TableCell className="whitespace-nowrap">
                  {project?.rate ? (
                    <b className="text-yellow-500 text-2xl flex items-center gap-2">
                      {project?.rate}
                      <HiStar size={26} />
                    </b>
                  ) : (
                    <Chip variant="flat" size="sm" color="secondary">
                      Inprogress
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <AvatarGroup isBordered>
                    {project?.students?.map((el) => (
                      <Avatar size="sm" key={el?.id} src={el?.img} />
                    ))}
                  </AvatarGroup>
                </TableCell>

                <TableCell>
                  <Switch
                    size="sm"
                    defaultSelected={project?.active}
                    aria-label="Automatic updates"
                    onClick={(e) => onSwitchClick(project.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 w-full justify-end">
                    <Button
                      variant="bordered"
                      size="sm"
                      // isIconOnly
                      startContent={<TbScoreboard size={18} />}
                      onClick={() => handleViewScore(project)}
                    >
                      Students
                    </Button>
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
                      <DeleteButton
                        link={`/projects/${project.id}`}
                        fetchData={() => setUpdate()}
                      />
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
