import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

export async function GET(req) {
  //   let resp = {};
  //   try {
  //     const students = await prisma.students.findMany();
  //     resp = { records: students , success: true };
  //   } catch (error) {
  //     resp = { err: error.message, success: false };
  //   }

  return NextResponse.json({ msg: "Hello World!" });
}
