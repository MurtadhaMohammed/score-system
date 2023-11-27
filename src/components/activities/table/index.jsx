import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Button,
  Switch,
  Chip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { BiEdit } from "react-icons/bi";
import { AiOutlineFundView } from "react-icons/ai";
import { LuImport } from "react-icons/lu";
import { useActivitiesStore } from "../store";
import { useAppStore } from "@/stores/app";
import fileDialog from "file-dialog";
import csvFileToJSON from "@/helper/csvFileToJSON";
import { axios } from "@/lib";
import DeleteButton from "@/components/buttons/deleteButton";

export const chipColor = {
  QUIZ: "secondary",
  TASK: "primary",
};

export const PureTable = ({ head = null }) => {
  const {
    setIsModal,
    setId,
    setTitle,
    setInfo,
    setDate,
    setIsImportModal,
    setIsScoreModal,
    setType,
    setScoreData,
    activities,
    setIsManualModal,
  } = useActivitiesStore();
  const { loading, setLoading, setUpdate } = useAppStore();

  const handleEdit = (row) => {
    setId(row?.id);
    setInfo(row?.info);
    setTitle(row?.title);
    setDate(row?.date);
    setType(row?.type);
    setIsModal(true);
  };

  const handleImportCSV = async (row) => {
    fileDialog({ accept: ".csv" }).then((file) => {
      csvFileToJSON(file[0], (data, err) => {
        if (err) throw err;
        // console.log(data)
        setId(row?.id);
        setScoreData(data);
        setTitle(row?.title);
        setType(row?.type);
        setIsImportModal(true);
      });
    });
  };

  const openManualModal = async (row) => {
    setId(row?.id);
    setTitle(row?.title);
    setType(row?.type);
    setIsManualModal(true);
  };

  const handleViewScore = (row) => {
    setId(row?.id);
    setTitle(row?.title);
    setDate(row?.date);
    setType(row?.type);
    setIsScoreModal(true);
  };

  const onSwitchClick = async (id) => {
    setLoading(true);
    await axios.patch(`/activity/${id}`);
    setUpdate();
    setLoading(false);
  };

  return (
    <div className="max-w-6xl m-auto pl-6 pr-6">
      <Card className="p-6">
        {head && head}
        <Table aria-label="Example static collection table" removeWrapper>
          <TableHeader>
            <TableColumn>Type</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Info</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Active</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              loading ? <Spinner label="Loading..." /> : "No rows to display."
            }
          >
            {activities
              ?.sort((a, b) => b.active - a.active)
              ?.map((activity) => (
                <TableRow key={activity?.id}>
                  <TableCell>
                    <Chip
                      variant="dot"
                      color={chipColor[activity?.type]}
                      size="md"
                    >
                      {activity?.type?.toLowerCase()}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <b>{activity?.title}</b>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    <div
                      className="activity-info"
                      dangerouslySetInnerHTML={{ __html: activity?.info }}
                    ></div>
                  </TableCell>
                  <TableCell>{activity?.date}</TableCell>
                  <TableCell>
                    <Switch
                      defaultSelected={activity?.active}
                      size="sm"
                      aria-label="Automatic updates"
                      onChange={() => onSwitchClick(activity?.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 w-full justify-end">
                      {activity?.finish && (
                        <Button
                          startContent={<AiOutlineFundView size={18} />}
                          variant="bordered"
                          size="sm"
                          color="primary"
                          onClick={() => handleViewScore(activity)}
                        >
                          View Score
                        </Button>
                      )}
                      {!activity?.finish && (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              startContent={<LuImport size={18} />}
                              size="sm"
                              color="secondary"
                              isLoading={loading}
                              isDisabled={loading}
                            >
                              Add Score
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Static Actions"
                            onAction={(key) => {
                              if (key === "csv") handleImportCSV(activity);
                              else if (key === "manual")
                                openManualModal(activity);
                            }}
                          >
                            <DropdownItem key="csv">Import CSV</DropdownItem>
                            <DropdownItem key="manual">Add Manual</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}
                      <Button
                        variant="bordered"
                        size="sm"
                        isIconOnly
                        onClick={() => handleEdit(activity)}
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
                          link={`/activity/${activity.id}`}
                          fetchData={() => setUpdate()}
                          // fetchData={getData}
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
