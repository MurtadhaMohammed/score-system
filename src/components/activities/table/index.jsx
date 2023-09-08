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
} from "@nextui-org/react";

import { BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlineFundView } from "react-icons/ai";
import { LuImport } from "react-icons/lu";
import { useActivitiesStore } from "../store";
import { activities } from "@/fake";
import { useAppStore } from "@/store";
import fileDialog from "file-dialog";
import csvFileToJSON from "@/helper/csvFileToJSON";

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
  } = useActivitiesStore();
  const { loading, course } = useAppStore();

  const handleEdit = (row) => {
    setId(row?.id);
    setInfo(row?.info);
    setTitle(row?.title);
    setDate(row?.date);
    setType(row?.type);
    setIsModal(true);
  };

  const handleImportCSV = async (row) => {
    fileDialog({ accept: '.csv' }).then((file) => {
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

  const handleViewScore = (row) =>{
    setId(row?.id);
    setTitle(row?.title);
    setDate(row?.date)
    setType(row?.type);
    setIsScoreModal(true);
  }

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
            {course &&
              activities?.map((activity) => (
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
                          onClick={()=>handleViewScore(activity)}
                        >
                          View Score
                        </Button>
                      )}
                      {!activity?.finish && (
                        <Button
                          startContent={<LuImport size={18} />}
                          size="sm"
                          color="secondary"
                          onClick={() => handleImportCSV(activity)}
                        >
                          Import CSV
                        </Button>
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
