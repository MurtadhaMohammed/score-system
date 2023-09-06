export const courses = [
  {
    id: 1,
    title: "Aon2023",
    description: "",
    score: {
      attendance: 10,
      quiz: 20,
      task: 30,
      project: 40,
    },
  },
];

export const students = [
  {
    id: 1,
    name: "Ali Sattar",
    birthDate: "1999/04/30",
    phone: "07710998987",
    email: "example@mail.co",
    img: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    active: true,
  },
  {
    id: 2,
    name: "نبا ناهض",
    birthDate: "1970/06/30",
    phone: "07710998987",
    email: "example@mail.co",
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    active: false,
  },
];

export const activities = [
  {
    id: 1,
    title: "Session Three (JsavScript Quize)",
    info: `This quize is on google sheet in this lik 
        <a  href="/#">https://quiz.com</a>`,
    date: "2023/05/20",
    type: "QUIZ", // QUIZ || TASK
    active: false,
    finish: false, // when import the result sheet should be true
  },
  {
    id: 2,
    title: "Session Two (React Homework)",
    info: `This homework is on google sheet in this lik 
        <a href="/#" >https://homework.com</a>`,
    date: "2023/05/20",
    type: "TASK", // QUIZ || TASK
    active: true,
    finish: true,
  },
];

export const scoreList = [
  {
    name: "Ali Sattar",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    score: "18",
  },
  {
    name: "Noor Jasim",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    score: "20",
  },
  {
    name: "Maria Iraq",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    score: "12",
  },
  {
    name: "Salim Soso",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    score: "8",
  },
  {
    name: "Murtadha Abed",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    score: "10",
  },
  {
    name: "Ali Nouri",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    score: "11",
  },
  {
    name: "Ahmed Ali",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    score: "15",
  },
  {
    name: "Abbas Ali",
    phone: "77719887676",
    img: "https://i.pravatar.cc/300?u=a042581f4f29026707d",
    score: "19",
  },
  {
    name: "Zainab Ahmed",
    phone: "77719887676",
    img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    score: "2",
  },
  {
    name: "Nabaa Abbas",
    phone: "77719887676",
    img: "https://i.pravatar.cc/300?u=a042581f4e29026710d",
    score: "17",
  },
];

export const projects = [
  {
    id: 1,
    title: "Pure System",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s `,
    documents: null,
    students,
    score: 36
  },
  {
    id: 2,
    title: "Voting App ( Foo 1990 )",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s `,
    documents: [
      "https://i.pravatar.cc/300?u=a042581f4e29026710d",
      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    ],
    students,
  },
  {
    id: 3,
    title: "E-clinic Online System",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s `,
    documents: ["https://i.pravatar.cc/300?u=a042581f4e29026710d"],
    students,
  },
];
