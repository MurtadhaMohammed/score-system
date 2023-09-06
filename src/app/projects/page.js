"use client";

import { Head, PureForm, PureTable } from "@/components/projects";
import { ScroeModal } from "@/components/projects/scoreModal";

export default function Projects() {
  return (
    <main>
      <PureTable head={<Head />} />
      <PureForm />
      <ScroeModal/>
    </main>
  );
}
