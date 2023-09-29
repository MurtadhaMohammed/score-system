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

  // const students = await prisma.stduentProject.findMany({
  //   where: {
  //     projectId: params.id,
  //   },
  //   include: {
  //     student: true,
  //   },
  // });

  const data = await prisma.project.findMany({
    where: {
      courseId,
    },
    include: {
      StduentProject: {
        include: {
          student: true,
        },
      },
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

  console.log("project data", data);

  return NextResponse.json({ data });
}
