import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function PUT(req, { params }) {
  const request = await req.json();

  await prisma.score.update({
    where: {
      id: params.id,
    },
    data: {
      active: true,
      activity: request.activity,
      description: request.description,
      linkID: request.linkID,
      type: request.type,
    },
  });

  return NextResponse.json({ req });
}

// Toggle
export async function PATCH(req, { params }) {
  const { id } = params;
  const score = await prisma.score.findUnique({
    where: {
      id,
    },
  });

  await prisma.score.update({
    where: {
      id,
    },
    data: {
      active: !score.active,
    },
  });

  return NextResponse.json({ req });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.score.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ req });
}

export async function GET(req, { params }) {
  const { id } = params;

  let response;

  const data = await prisma.score.findUnique({
    where: {
      linkID: id,
    },
    include: {
      activity: true,
    },
  });

  const students = await prisma.student.findMany({
    where: {
      courseId: data.courseId,
    },
  });

  if (data.type === "GENERAL") {
    const studentScore = [];

    for (const s of students) {
      const tasksAndQuizzes = await prisma.studentActivitiy.findMany({
        where: {
          studentPhone: s.phone,
        },
      });

      let score = tasksAndQuizzes.reduce((acc, curr) => {
        return acc + curr.score;
      }, 0);

      studentScore.push({
        ...s,
        score: score / tasksAndQuizzes.length,
      });
    }

    response = studentScore;
  }

  if (data.type === "ACTIVITY") {
    const studentScore = [];

    for (const s of students) {
      const tasksAndQuizzes = await prisma.studentActivitiy.findFirst({
        where: {
          studentPhone: s.phone,
          activitiy: {
            type: data.activity.type,
            id: data.activitiyId,
          },
        },
      });

      // let score = tasksAndQuizzes.reduce((acc, curr) => {
      //   return acc + curr.score;
      // }, 0);

      studentScore.push({
        ...s,
        score: tasksAndQuizzes?.score ?? 0,
      });
    }

    response = studentScore;
  }

  if (data.type === "PROJECTS") {
    const studentScore = [];

    for (const s of students) {
      const projects = await prisma.stduentProject.findMany({
        where: {
          studentId: s.id,
        },
      });

      let score = projects.reduce((acc, curr) => {
        return acc + curr.score;
      }, 0);

      studentScore.push({
        ...s,
        score: score / projects.length,
      });
    }

    response = studentScore;
  }

  if (data.type === "FINAL") {
    const studentScore = [];

    for (const s of students) {
      const tasksAndQuizzes = await prisma.studentActivitiy.findMany({
        where: {
          studentPhone: s.phone,
        },
      });

      const projects = await prisma.stduentProject.findMany({
        where: {
          studentId: s.id,
        },
      });

      let score = tasksAndQuizzes.reduce((acc, curr) => {
        return acc + curr.score;
      }, 0);

      let score2 = projects.reduce((acc, curr) => {
        return acc + curr.score;
      }, 0);

      studentScore.push({
        ...s,
        score: (score + score2) / (projects.length + tasksAndQuizzes.length),
      });
    }

    response = studentScore;
  }
  return NextResponse.json({
    data: {
      list: response,
      score: data,
    },
  });
}
