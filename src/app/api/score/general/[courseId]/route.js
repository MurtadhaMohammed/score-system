import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(req, { params }) {
  const { courseId } = params;

  const totalActivity = await prisma.activitiy.count({
    where: {
      courseId: courseId,
      active: true,
    },
  });
  const students = await prisma.student.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      StudentActivitiy: {
        include: {
          activitiy: true,
        },
      },
    },
  });

  return NextResponse.json({
    data: { students, totalActivity },
  });
}
