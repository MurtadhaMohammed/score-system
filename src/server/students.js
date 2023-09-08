"use server";

import { revalidatePath, revalidateTag } from "next/cache"
import { sendRequest } from "./fetach"



export const getStudents = async ()=>{
    const students = await sendRequest({method:"GET",endpoint:"/students",tag:"students"})
    return students
}
export const createStudent = async (body)=>{
    const students = await sendRequest({method:"POST",body,endpoint:"/students"})
    revalidateTag("students")
    return students
}
export const DeleteStudent = async (id)=>{
    console.log(id,"idddddddddddddddddddddddddddddddddddddddddddddddd");
    const students = await sendRequest({method:"Delete",endpoint:`/students/${id}`})
    revalidateTag("students")
    return students
}