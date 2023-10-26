"use client";

import { Button, Divider, Spinner } from "@nextui-org/react";
import StudentCard from "../studentCard";
import { useEffect, useState } from "react";
import { axios } from "@/lib";

// let  = data;
export const RandomStudent = () => {
  //   const students = [
  //     { id: 1, name: "Ali S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 2, name: "Noor S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 3, name: "Soso S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 4, name: "Foo S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 5, name: "Bar S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 6, name: "Z S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 7, name: "K S. Salim", email: "ali@gmail.com", img: "" },
  //     { id: 8, name: "G S. Salim", email: "ali@gmail.com", img: "" },
  //   ];
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState({});
  const [used, setUsed] = useState([]);

  useEffect(() => {
    if (students?.length !== 0) return;
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(
        `/student?courseId=35924682-1d55-4e1f-b795-ad14d75cb6b5`
      );
      setStudents(res.data.data);
      setLoading(false);
    };

    getData().then();
  }, []);

  //   useEffect(() => {
  //     if (students?.length > 0) changeIndex();
  //   }, [students]);

  //   const changeIndex = () => {
  //     students.map((_, index) => {
  //       setTimeout(() => {
  //         const randomSelect = getRandomNumber(
  //           0,
  //           students.length - used.length - 1
  //         );
  //         const student =
  //           students.filter((std) => {
  //             return !used.find((use) => use?.id === std?.id);
  //           })[randomSelect] || {};

  //         if (used.length === students.length) {
  //           setUsed([]);
  //           setCurrent({});
  //           return;
  //         }

  //         setCurrent(() => student);
  //         setUsed([...used, student]);
  //       }, 200 * index);
  //     });
  //   };

  function getRandomNumber(min, max) {
    // Generate a random floating-point number between 0 and 1
    const random = Math.random();

    // Scale the random number to the desired range
    const range = max - min;
    const randomNumber = min + random * range;

    // Use Math.floor to make it an integer if needed
    return Math.ceil(randomNumber);
  }

  //   useEffect(() => {
  //     next();
  //   }, []);

  const next = () => {
    const randomSelect = getRandomNumber(0, students.length - used.length - 1);
    const student =
      students.filter((std) => {
        return !used.find((use) => use?.id === std?.id);
      })[randomSelect] || {};

    if (used.length === students.length) {
      setUsed([]);
      setCurrent({});
      return;
    }

    setCurrent(() => student);
    setUsed([...used, student]);
  };

  //35924682-1d55-4e1f-b795-ad14d75cb6b5

  return (
    <div>
      {current?.id && <StudentCard data={current} />}

      {current?.id && <Divider className="mt-12 mb-6" />}
      <ul className=" text-lg">
        <li className="mt-4">Q1 : What is your Nickname ? 😉</li>
        <li className="mt-4">Q2 : Your current work or studying ? 🧑‍💻</li>
        <li className="mt-4">Q3 : What is your goal in the live ? 👻 💀</li>
        <li className="mt-4">Q4 : Fun fact about you ? 🫣</li>
      </ul>
      <Divider className="mt-6 mb-6" />

      <div className="flex items-center justify-center mt-8 w-full">
        {used?.length === 0 ? (
          <Button size="lg" isLoading={loading} onClick={next} fullWidth>
            Start
          </Button>
        ) : used.length === students.length ? (
          <Button onClick={next} fullWidth>
            Reset
          </Button>
        ) : (
          <Button onClick={next} fullWidth>
            Next - {students?.length - used?.length}
          </Button>
        )}
      </div>
    </div>
  );
};
