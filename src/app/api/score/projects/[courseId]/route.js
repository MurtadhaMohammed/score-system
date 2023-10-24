import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function GET(req, { params }) {
  const { courseId } = params;

  const students = await prisma.student.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      StduentProject: {
        include:{
          project: true
        }
      },
    },
  });

  return NextResponse.json({
    data: { students },
  });
}
