import { prisma } from "@/lib";

import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  const data = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      student: true,
      projects: true,
      grade: true,
      Activitiy: true,
    },
  });

  return NextResponse.json({ data });
}
