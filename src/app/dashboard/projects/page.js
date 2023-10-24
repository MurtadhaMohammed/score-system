"use client";

import { Head, PureForm, PureTable } from "@/components/projects";
import { ScroeModal } from "@/components/projects/scoreModal";
import { axios } from "@/lib";
import { useEffect, useState } from "react";
import { useAppStore } from "@/stores";
import { useProjectStore } from "@/components/projects/store";

export default function Projects() {
  const { course, setLoading, isUpdate } = useAppStore();
  const { setProjects } = useProjectStore();

  const getData = async () => {
    if (!course) return;

    setLoading(true);
    const { data } = await axios.get(`/projects?courseId=${course.id}`);

    setProjects(data.data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [course, isUpdate]);

  return (
    <main>
      <PureTable head={<Head />} />
      <PureForm />
      <ScroeModal />
    </main>
  );
}
