import prisma from "../../../../libs/prismadb"
import { NextResponse } from "next/server"
export const DELETE = async (request, { params }) => {
    try {
      const { id } = params;
  
      await prisma.student.delete({
          where: {
              id
          }
      });
  
      return NextResponse.json("Post has been deleted");
    } catch (err) {
      return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
  };