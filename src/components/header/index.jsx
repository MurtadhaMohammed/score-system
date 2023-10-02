"use client";

export const revalidate = 0;

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
import { useAppStore, useStudentCourse } from "@/stores";
import { useEffect } from "react";
import { axios } from "@/lib";
import { useSession, signIn, signOut } from "next-auth/react";

const MainHeader = () => {
  const { setCourse, setLoading, courses, setCourses } = useAppStore();
  // const { setStudentCourse } = useStudentCourse();


  const pathname = usePathname();

  const { status } = useSession();

  if (!pathname.includes("login")) {
    if (status === "unauthenticated") signIn();
  }

  useEffect(() => {
    setCourse(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const { data } = await axios.get("/course");

      setCourses(data.data);

      setLoading(false);
    };

    getData().then();
  }, []);

  const handleCourseChange = async (courseId) => {
    setLoading(true);

    const selectedCourse = (await axios.get(`/course/${courseId}`)).data.data;
    // setStudentCourse(selectedCourse?.student);
    setCourse(selectedCourse);
    // setProjects(selectedCourse?.projects);

    setLoading(false);
  };

  if (pathname.includes("login") || pathname.includes("link")) return null;

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
            className={pathname === "/dashboard" ? "text-blue-600" : ""}
            href="/dashboard"
          >
            Students
          </Link>

          <Link
            color="foreground"
            href="/dashboard/activities"
            className={
              pathname === "/dashboard/activities" ? "text-blue-600" : ""
            }
          >
            Activities
          </Link>

          <Link
            color="foreground"
            href="/dashboard/projects"
            className={
              pathname === "/dashboard/projects" ? "text-blue-600" : ""
            }
          >
            Projects
          </Link>

          <Link
            color="foreground"
            href="/dashboard/score"
            className={pathname === "/dashboard/score" ? "text-blue-600" : ""}
          >
            Score
          </Link>
        </div>

        <div className="flex gap-6">
          <Select
            placeholder="Select Course"
            size="xs"
            className="w-40"
            variant="flat"
            aria-label="Select Course"
            defaultValue={null}
            onChange={(e) => handleCourseChange(e.target.value)}
          >
            {courses &&
              courses?.map((course) => (
                <SelectItem key={course?.id} value={course?.id}>
                  {course?.title}
                </SelectItem>
              ))}
          </Select>
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center">
                <div className="text-end hidden sm:block">
                  <span className="font-extrabold leading-none text-mg">
                    Admin
                  </span>
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
                Account Info
              </DropdownItem>
              <DropdownItem startContent={<RiLockPasswordLine />} key="reset">
                Reset Password
              </DropdownItem>
              <DropdownItem
                startContent={<LiaSignOutAltSolid />}
                key="logout"
                className="text-danger"
                color="danger"
                onClick={() => signOut()}
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
