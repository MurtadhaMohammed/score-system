"use client";

import { useEffect } from "react";
import { Head, PureForm, PureTable } from "@/components/home";
import { useAppStore } from "@/stores";
import { axios } from "@/lib";
import { useStudentStore } from "@/components/home/store";

export default function Home() {
  const { setStudents } = useStudentStore();
  const { setLoading, course, isUpdate } = useAppStore();

  useEffect(() => {
    if (!course) return;

    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`/student?courseId=${course.id}`);
      setStudents(res.data.data);
      setLoading(false);
    };

    getData().then();
  }, [course, isUpdate]);

  return (
    <main className="min-h-screen">
      <PureTable head={<Head />} />
      <PureForm />
    </main>
  );
}
