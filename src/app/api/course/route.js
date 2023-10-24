import { prisma } from "@/lib";

import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req) {
  const data = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      active: true,
      description: true,
      createdAt: true,
      grade: true,
      gradeId: true,
    },
  });

  return NextResponse.json({ data });
}

export async function POST(req) {
  const data = await req.json();

  const grade = await prisma.grades.create({
    data: {
      attendance: data.attendance,
      project: data.project,
      quiz: data.quiz,
      task: data.task,
    },
  });

  const course = await prisma.course.create({
    data: {
      title: data.name,
      description: data.name,
      gradeId: grade.id,
    },
  });

  return NextResponse.json({ id: course.id });
}
