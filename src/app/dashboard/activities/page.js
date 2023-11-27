"use client";

import { useEffect } from "react";
import { Head, PureForm, PureTable } from "@/components/activities";
import { ImportModal } from "@/components/activities/importModal";
import { ScroeModal } from "@/components/activities/scoreModal";
import { useActivitiesStore } from "@/components/activities/store";
import { useAppStore } from "@/stores";
import { axios } from "@/lib";
import { ManualModal } from "@/components/activities/manualModal";

export default function Activities() {
  const { setActivities, typeQuery } = useActivitiesStore();
  const { setLoading, course, isUpdate } = useAppStore();

  useEffect(() => {
    if (!course) return;

    const getData = async () => {
      setLoading(true);

      const res = await axios.get(
        `/activity?courseId=${course.id}&type=${typeQuery}`
      );

      setActivities(res.data.data);
     
      setLoading(false);
    };

    getData().then();
  }, [course, typeQuery, isUpdate]);

  return (
    <main>
      <PureTable head={<Head />} />
      <PureForm />
      <ImportModal />
      <ScroeModal />
      <ManualModal />
    </main>
  );
}
