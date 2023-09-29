"use client";
import { useEffect } from "react";
import { Head, PureForm, PureTable } from "@/components/home";
import { useAppStore } from "@/stores";
import { axios } from "@/lib";

export default function Home() {
  const { setLoading, setCourses } = useAppStore();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get("/course");

      setCourses(data.data);

      setLoading(false);
    };

    getData().then();
  }, []);

  return (
    <main className="min-h-screen">
      <PureTable head={<Head />} />
      <PureForm />
    </main>
  );
}
