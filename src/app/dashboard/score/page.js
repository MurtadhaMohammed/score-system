"use client";

import { Head, PureForm, PureTable } from "@/components/score";
import { useEffect } from "react";
import { axios } from "@/lib";
import { useScoreStore } from "@/components/score/store";
import { useAppStore } from "@/stores";

export default function Score() {
  const { setLoading, course } = useAppStore();
  const { setScores } = useScoreStore();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const score = await axios.get("/score?courseId=" + course?.id);
      setScores(score.data.data);
      setLoading(false);
    };

    getData().then();
  }, [course]);

  return (
    <main className="min-h-screen">
      <PureTable head={<Head />} />
      <PureForm />
    </main>
  );
}
