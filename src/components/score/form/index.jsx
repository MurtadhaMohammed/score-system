"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  SelectItem,
  Select,
  Textarea,
  Chip,
} from "@nextui-org/react";
import { useScoreStore } from "../store";
import { useAppStore } from "@/store";
import { activitiesList } from "@/fake";
import { chipColor } from "@/components/activities";

export const PureForm = () => {
  const {
    isModal,
    setIsModal,
    id,
    reset,
    description,
    activities,
    viewType,
    type,
    setDescription,
    setViewType,
    setType,
    setActivities,
  } = useScoreStore();
  const { course } = useAppStore();

  const handleSubmit = () => {
    let data = {
      description,
      type,
      viewType,
      activities,
    };
    if (id) console.log("Edit : ", data);
    else console.log("Create : ", data);
  };

  return (
    <Modal size="lg" isOpen={isModal} onOpenChange={setIsModal} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {id ? "Edit" : "New"} ShortLink
        </ModalHeader>
        <ModalBody>
          <Textarea
            label="Description"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Description for this link"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-4">
            <Select
              label="Type"
              placeholder="Type"
              className="w-full"
              variant="bordered"
              labelPlacement="outside"
              isClearable
              selectedKeys={[type]}
              onChange={(e) => setType(e.target.value)}
            >
              <SelectItem key={"ACTIVITY"} value={"ACTIVITY"}>
                Activity
              </SelectItem>
              <SelectItem key={"PROJECT"} value={"PROJECT"}>
                Project
              </SelectItem>
            </Select>
            <Select
              label="View Type"
              placeholder="View Type"
              className="w-full"
              variant="bordered"
              labelPlacement="outside"
              isClearable
              selectedKeys={[viewType]}
              onChange={(e) => setViewType(e.target.value)}
            >
              <SelectItem key={"SCORE"} value={"SCORE"}>
                Score
              </SelectItem>
              <SelectItem key={"TREND"} value={"TREND"}>
                Trend
              </SelectItem>
            </Select>
          </div>
          {type === "ACTIVITY" && (
            <Select
              items={activitiesList}
              label="Activities"
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Select Activity"
              labelPlacement="outside"
              selectedKeys={activities}
              onChange={(e) => setActivities(e.target.value)}
              classNames={{
                base: "max-w-full",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(items) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                      <Chip key={item.key}>
                        {i + 1} - {item.data.title}
                      </Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(item) => (
                <SelectItem key={item.id} textValue={item.title}>
                  <div className="flex gap-2">
                    <Chip variant="dot" color={chipColor[item?.type]} size="md">
                      {item?.type?.toLowerCase()}
                    </Chip>
                    <div className="flex flex-col">
                      <span className="text-small">{item.title}</span>
                      <span className="text-tiny text-default-400">
                        <div
                          className="activity-info"
                          dangerouslySetInnerHTML={{ __html: item?.info }}
                        ></div>
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          )}
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
          <Button color="primary" onPress={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

/*

Score links 
create diynamic link that can view score info or trend chart to the students


we have foure view of this link

1 - view the trend students
2 - view all score by select the activities
3 - view project score 
4 - view project trend 

*/
