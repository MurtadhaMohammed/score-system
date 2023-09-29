import { prisma } from "@/lib";
import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function POST(req) {
  const request = await req.json();

  const { projectId, students } = request;

  await prisma.stduentProject.deleteMany({
    where: {
      projectId,
    },
  });

  const data = students.map((student) => {
    return {
      studentId: student.id,
      projectId,
      score: student.score,
    };
  });

  await prisma.stduentProject.createMany({
    data,
  });

  return NextResponse.json({ data: "ok" });
}
