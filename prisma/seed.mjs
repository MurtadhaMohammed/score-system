import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function main() {
  const password = await bcrypt.hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });

  const course = await prisma.course.create({
    data: {
      title: "Course 1",
      description: "Course 1 description",
      grade: {
        create: {
          attendance: 10,
          project: 30,
          quiz: 20,
          task: 50,
        },
      },
    },
  });

  const students = await prisma.student.createMany({
    data: [
      {
        name: "Student 1",
        phone: "77719887676",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 2",
        phone: "77719887671",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 3",
        phone: "77719887672",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 4",
        phone: "77719887673",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 5",
        phone: "77719887674",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 6",
        phone: "77719887675",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 7",
        phone: "77719887677",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 8",
        phone: "77719887679",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 9",
        phone: "77719887670",
        email: "",
        courseId: course.id,
      },
      {
        name: "Student 10",
        phone: "77719887600",
        email: "",
        courseId: course.id,
      },
    ],
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
