// url: http://localhost:3000/api/posts 
import prisma from "../../../libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request) => {
    try {
        const res = await request.json()
        const { name, img, birthDate, phone, email } = res;

        const newStudent = await prisma.student.create({
            data: {
                name, img, birthDate, phone, email
            }
        })

        return NextResponse.json({message:newStudent},{ status: 200 });

    } catch (err) {
        return NextResponse.json({ message: 'Post error', err }, { status: 500 })
    }
}

export const GET = async () => {
    try {

        const students = await prisma.student.findMany()
        return NextResponse.json(students);

    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}
