import { prisma } from "@/lib";

import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function POST(req) {
  const request = await req.json();

  await prisma.student.create({
    data: {
      name: request.name,
      email: request.email,
      birthDate: request.birthDate,
      img: request.img,
      phone: request.phone,
      course: {
        connect: {
          id: request.course.id,
        },
      },
    },
  });
  return NextResponse.json({ req });
}

export async function GET(req, { query }) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const courseId = searchParams.get("courseId");

  const data = await prisma.student.findMany({
    where: {
      courseId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ data });
}
