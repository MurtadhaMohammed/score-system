"use client";

import { Head, PureForm, PureTable } from "@/components/projects";

export default function Projects() {
  return (
    <main>
      <PureTable head={<Head />} />
      <PureForm />
    </main>
  );
}
