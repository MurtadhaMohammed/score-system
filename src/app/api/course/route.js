import { prisma } from "@/lib";

import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req) {
  const data = await prisma.course.findMany({
    include: {
      student: true,
    },
  });

  return NextResponse.json({ data });
}
