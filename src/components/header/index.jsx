"use client";

import {
  DropdownTrigger,
  DropdownItem,
  Spacer,
  Avatar,
  Dropdown,
  DropdownMenu,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { LuUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useAppStore } from "@/store";
import { useEffect } from "react";

const MainHeader = () => {
  const { course, setCourse, setLoading } = useAppStore();
  const pathname = usePathname();

  useEffect(() => {
    setCourse(localStorage.getItem("aon_course_id") || null);
    setLoading(false);
  }, []);

  return (
    <div className="pt-8 pb-2 mb-6 border-b-1 border-b-slate-100">
      <div className="max-w-6xl m-auto pl-6 pr-6  flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl">
            <Image width={46} height={46} src={logo} className=" rounded-lg" />
          </div>
          <Spacer />
          <Link
            color="foreground"
            className={pathname === "/" ? "text-blue-600" : ""}
            href="/"
          >
            Students
          </Link>

          <Link
            color="foreground"
            href="/activities"
            className={pathname === "/activities" ? "text-blue-600" : ""}
          >
            Activities
          </Link>

          <Link
            color="foreground"
            href="/projects"
            className={pathname === "/projects" ? "text-blue-600" : ""}
          >
            Projects
          </Link>
        </div>

        <div className="flex gap-6">
          <Select
            //label="Course"
            placeholder="Select Course"
            size="xs"
            className="w-40"
            variant="flat"
            selectedKeys={course}
            onChange={(e) => {
              setCourse(e.target.value);
              localStorage.setItem("aon_course_id", e.target.value);
            }}
          >
            <SelectItem key={1} value={1}>
              Aon2023
            </SelectItem>
          </Select>
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center">
                <div className="text-end hidden sm:block">
                  <p className="font-extrabold leading-none text-mg">Admin</p>
                </div>
                <Spacer x={2} />
                <Avatar size="sm" radius="full" icon={<LuUser />} />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              aria-label="Dropdown menu with shortcut"
            >
              <DropdownItem startContent={<LuUser />} key="account">
                Acount Info
              </DropdownItem>
              <DropdownItem startContent={<RiLockPasswordLine />} key="reset">
                Reset Password
              </DropdownItem>
              <DropdownItem
                startContent={<LiaSignOutAltSolid />}
                key="logout"
                className="text-danger"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>{" "}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
