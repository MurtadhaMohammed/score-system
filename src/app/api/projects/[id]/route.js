import { prisma } from "@/lib";

import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const request = await req.json();

  const { id } = params;

  const { description, title, documents, courseId } = request;

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      description,
      title,
      documents,
      courseId,
    },
  });

  return NextResponse.json({ req });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.project.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ req });
}

// Toggle
export async function PATCH(req, { params }) {
  const { id } = params;
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      active: !project.active,
    },
  });

  return NextResponse.json({ req });
}

export async function GET(req, { params, query }) {
  const { id } = params;

  const data = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      StduentProject: {
        include: {
          student: true,
        },
      },
    },
  });

  if (data?.StduentProject) {
    data.student = data?.StduentProject.map((studentProject) => {
      return {
        ...studentProject.student,
        score: studentProject.score,
      };
    });
  }

  return NextResponse.json({ data });
}
