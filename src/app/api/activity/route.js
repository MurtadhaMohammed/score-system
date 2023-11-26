import { NextResponse } from "next/server";
import { prisma } from "@/lib";
import { flattenObject } from "@/helper";

export async function POST(req) {
  const request = await req.json();

  const { type, date, title, info, courseId } = request;

  await prisma.activitiy.create({
    data: {
      date,
      info,
      type,
      title,
      courseId,
    },
  });

  return NextResponse.json({ req });
}

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const courseId = searchParams.get("courseId");
  const type = searchParams.get("type");

  const where = {
    courseId,
  };

  if (type === "QUIZ" || type === "TASK") {
    where.type = type;
  }

  const data = await prisma.activitiy.findMany({
    where,
    include: {
      StudentActivitiy: {
        include: {
          student: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ data });
}

