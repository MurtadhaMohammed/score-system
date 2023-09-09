"use client";

import { Head, PureForm, PureTable } from "@/components/score";

export default function Score() {
  return (
    <main className="min-h-screen">
      <PureTable head={<Head />} />
      <PureForm />
    </main>
  );
}
