import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req) {
  const request = await req.json();

  const { description, title, documents, courseId } = request;

  await prisma.project.create({
    data: {
      description,
      title,
      documents,
      courseId,
    },
  });

  return NextResponse.json({ req });
}

export async function GET(req, { params, query }) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const courseId = searchParams.get("courseId");
  let active = searchParams.get("active") || undefined;

  const data = await prisma.project.findMany({
    where: {
      courseId,
      active: active === undefined ? undefined : active === "true", 
    },
    include: {
      StduentProject: {
        include: {
          student: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  data.forEach((project) => {
    project.students = project.StduentProject.map((studentProject) => {
      return {
        ...studentProject.student,
        score: studentProject.score,
      };
    });
  });

  return NextResponse.json({ data });
}
