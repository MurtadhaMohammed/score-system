import { getStudents } from "@/server/students";
import { HomeCom } from "./Home";


export default async function Home() {
  const students = await getStudents();
  return (
    <HomeCom students={students.data} />
  );
}
