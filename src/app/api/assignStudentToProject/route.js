import { prisma } from "@/lib";
import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function POST(req) {
  const request = await req.json();

  const { projectId, students } = request;

  // Make me a list of the student ids
  const studentIds = students.map((student) => student.id);

  await prisma.stduentProject.deleteMany({
    where: {
      OR: [
        {
          studentId: {
            in: studentIds,
          },
        },
        {
          projectId,
        },
      ],
    },
  });

  // const data = students.map((student) => {
  //   return {
  //     studentId: student.id,
  //     projectId,
  //     score: student.score,
  //   };
  // });

  // Make sure that the coming data is unique (stduentId) and do NOT return a response just clean the data from the duplicate

  const key = "id";

  const arrayUniqueByKey = [
    ...new Map(students.map((item) => [item[key], item])).values(),
  ];

  const data = arrayUniqueByKey.map((student) => {
    return {
      studentId: student.id,
      projectId,
      score: student.score,
    };
  });

  console.log("data", data);

  await prisma.stduentProject.createMany({
    data,
  });

  return NextResponse.json({ data: "ok" });
}
