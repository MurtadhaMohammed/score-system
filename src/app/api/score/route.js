import { prisma } from "@/lib";
import { NextResponse } from "next/server";

const randomString = () => {
  return Math.random().toString(36).substring(2, 15);
};

export async function POST(req) {
  const request = await req.json();

  await prisma.score.create({
    data: {
      active: true,
      activity: {
        connect: {
          id: request.activityId,
        },
      },
      description: request.description,
      linkID: randomString(),
      type: request.type,
      course: {
        connect: {
          id: request.courseId,
        },
      },
    },
  });
  return NextResponse.json({ req });
}

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const courseId = searchParams.get("courseId");

  const data = await prisma.score.findMany({
    where: {
      courseId,
    },
  });

  return NextResponse.json({ data });
}
