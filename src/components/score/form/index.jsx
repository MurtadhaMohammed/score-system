"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
    activity,
    type,
    setDescription,
    setType,
    setActivity,
  } = useScoreStore();
  const { course } = useAppStore();

  const handleSubmit = () => {
    let data = {
      description,
      type,
      activity,
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
              onChange={(e) => {
                setType(e.target.value)
                setActivity(null)
              }}
            >
              <SelectItem key={"ACTIVITY"} value={"ACTIVITY"}>
                Activity
              </SelectItem>
              <SelectItem key={"GENERAL"} value={"GENERAL"}>
                General
              </SelectItem>
              <SelectItem key={"PROJECTS"} value={"PROJECTS"}>
                Projects
              </SelectItem>
              <SelectItem key={"FINAL"} value={"FINAL"}>
                Final
              </SelectItem>
            </Select>
          </div>
          {type === "ACTIVITY" && (
            <Select
              items={activitiesList}
              label="Activities"
              variant="bordered"
              isMultiline={true}
              // selectionMode="multiple"
              placeholder="Select Activity"
              labelPlacement="outside"
              selectedKeys={activity}
              onChange={(e) => setActivity(e.target.value)}
              classNames={{
                base: "max-w-full mt-4",
                trigger: "min-h-unit-12 py-2",
              }}
              renderValue={(items) => {
                return items.map((item) => (
                  <div key={item.key} className="flex items-start gap-2">
                    <Chip
                      variant="dot"
                      color={chipColor[item?.data?.type]}
                      size="md"
                      className="mt-1"
                    >
                      {item?.data?.type?.toLowerCase()}
                    </Chip>
                    <div className="flex flex-col">
                      <span>{item.data.title}</span>
                      <span className="text-default-500 text-tiny">
                        <div
                          className="activity-info"
                          dangerouslySetInnerHTML={{ __html: item?.data?.info }}
                        ></div>
                      </span>
                    </div>
                  </div>
                ));
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
