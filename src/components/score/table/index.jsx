import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Chip,
  Button,
  Switch,
  Spinner,
  Link,
} from "@nextui-org/react";

import { BiEdit, BiTrash, BiLink } from "react-icons/bi";
import { useScoreStore } from "../store";
import { scoreLinks } from "@/fake";
import { useAppStore } from "@/store";

const typColor = {
  ACTIVITY: "secondary",
  GENERAL: "success",
  PROJECTS: "primary",
};

export const PureTable = ({ head = null }) => {
  const { setIsModal, setId, setDescription, setType, setActivity } =
    useScoreStore();
  const { course, loading } = useAppStore();

  const handleEdit = (row) => {
    setId(row?.id);
    setDescription(row?.description);
    setType(row?.type);
    setActivity(row?.activity);
    setIsModal(true);
  };

  return (
    <div className="max-w-6xl m-auto pl-6 pr-6">
      <Card className="p-6">
        {head && head}
        <Table aria-label="Example static collection table" removeWrapper>
          <TableHeader>
            <TableColumn>LinkID</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Active</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={
              loading ? <Spinner label="Loading..." /> : "No rows to display."
            }
          >
            {course &&
              scoreLinks?.map((link) => (
                <TableRow key={link?.id}>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/${link?.linkID}`} target="_blank">
                        <BiLink size={18} />
                      </Link>
                      <b>{link?.linkID}</b>
                    </div>
                  </TableCell>
                  <TableCell>{link?.description}</TableCell>
                  <TableCell>
                    <Chip variant="bordered" color={typColor[link?.type]}>
                      {link?.type?.toLowerCase()}
                    </Chip>
                  </TableCell>

                  <TableCell>
                    <Switch
                      size="sm"
                      defaultSelected={link?.active}
                      aria-label="Automatic updates"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 w-full justify-end">
                      <Button
                        variant="bordered"
                        size="sm"
                        isIconOnly
                        onClick={() => handleEdit(link)}
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
