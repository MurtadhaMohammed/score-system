"use client";

import { Head, PureForm, PureTable } from "@/components/home";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PureTable head={<Head />} />
      <PureForm/>
    </main>
  );
}
