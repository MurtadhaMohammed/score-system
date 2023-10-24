import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const request = await req.json();

  const { type, date, title, info, courseId } = request;

  await prisma.activitiy.update({
    where: {
      id: params.id,
    },
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

export async function PATCH(req, { params }) {
  const { id } = params;

  const activitiy = await prisma.activitiy.findUnique({
    where: {
      id,
    },
  });

  await prisma.activitiy.update({
    where: {
      id,
    },
    data: {
      active: !activitiy.active,
    },
  });

  return NextResponse.json({ req });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.activitiy.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ req });
}

export async function GET(req, { params }) {
  const { id } = params;

  const activitiy = await prisma.activitiy.findUnique({
    where: {
      id,
    },
    include: {
      StudentActivitiy: {
        include: {
          student: true,
        },
      },
    },
  });

  return NextResponse.json({ data: activitiy });
}
