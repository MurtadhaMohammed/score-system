import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = params;

  const request = await req.json();

  // const data = request.data.map((d) => {
  //   return {
  //     score: Number(d.score),
  //     activitiyId: id,
  //     studentPhone: d.phone,
  //   };
  // });

  // Map the data and check if the student is in the system or if the coming data has a duplicate phone number
  const data = request.data.map((d) => {
    return {
      score: Number(d.score),
      activitiyId: id,
      studentPhone: d.phone,
    };
  });

  // Check if the coming data has a duplicate phone number
  const duplicate = data.find(
    (d) => data.filter((d2) => d2.studentPhone === d.studentPhone).length > 1
  );

  if (duplicate) {
    return NextResponse.json({
      error: `duplicate ${duplicate.studentPhone} phone number in the coming data`,
    });
  }

  console.log("request", request);
  console.log("data", data);

  for (const d of data) {
    try {
      await prisma.studentActivitiy.delete({
        where: {
          activitiyId: d.activitiyId,
          studentPhone: d.studentPhone,
        },
      });

      await prisma.studentActivitiy.create({
        data: { ...d },
      });
    } catch (e) {
      return NextResponse.json({
        error: `student with number ${d.studentPhone} is not in the system`,
      });
    }
  }

  await prisma.activitiy.update({
    where: {
      id,
    },
    data: {
      finish: true,
    },
  });

  return NextResponse.json({ req });
}

// export async function GET(req, { params }) {
//   const { id } = params;

//   const activitiy = await prisma.activitiy.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       studentActivitiy: {
//         include: {
//           student: true,
//         },
//       },
//     },
//   });

//   return NextResponse.json({ activitiy });
// }