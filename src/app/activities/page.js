"use client";

import { Head, PureForm, PureTable } from "@/components/activities";
import { ImportModal } from "@/components/activities/importModal";
import { ScroeModal } from "@/components/activities/scoreModal";

export default function Activities() {
  return (
    <main>
      <PureTable head={<Head />} />
      <PureForm />
      <ImportModal />
      <ScroeModal />
    </main>
  );
}
