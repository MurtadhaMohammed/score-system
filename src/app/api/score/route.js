import { prisma } from "@/lib";
import { NextResponse } from "next/server";

const randomString = () => {
  return Math.random().toString(36).substring(2, 15);
};

export async function POST(req) {
  const request = await req.json();

  const data = {
    active: true,
    description: request.description,
    linkID: randomString(),
    type: request.type,
    course: {
      connect: {
        id: request.courseId,
      },
    },
  };

  if (request.activityId) {
    data.activity = {
      connect: {
        id: request.activityId,
      },
    };
  }

  await prisma.score.create({
    data,
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ data });
}
