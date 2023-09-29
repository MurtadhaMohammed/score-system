import { NextResponse } from "next/server";
import { prisma } from "@/lib";

export async function PUT(req, { params }) {
  const request = await req.json();

  await prisma.student.update({
    where: {
      id: params.id,
    },
    data: {
      name: request.name,
      email: request.email,
      birthDate: request.birthDate,
      img: request.img,
      phone: request.phone,
    },
  });

  return NextResponse.json({ req });
}

// Toggle
export async function PATCH(req, { params }) {
  const { id } = params;
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
  });

  await prisma.student.update({
    where: {
      id,
    },
    data: {
      active: !student.active,
    },
  });

  return NextResponse.json({ req });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  await prisma.student.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ req });
}
