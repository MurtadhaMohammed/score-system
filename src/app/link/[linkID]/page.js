"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ActivityScore, GeneralScore, ProjectsScore } from "@/components/links";
import { FinalScore } from "@/components/links/finalScore";
import { ProjectsRate } from "@/components/links/projectsRate";
import { useParams } from "next/navigation";
import { axios } from "@/lib";


export default function Link() {
  const params = useParams();

  const { linkID } = params;

  const [scoreData, setScoreData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/score/${linkID}`).then((res) => {
      setScoreData(res.data.data);
      setLoading(false);
    });
  }, [linkID]);

  const renderView = {
    GENERAL: <GeneralScore data={scoreData} />,
    ACTIVITY: <ActivityScore data={scoreData} />,
    PROJECTS: <ProjectsScore data={scoreData} />,
    PROJECTS_RATE: <ProjectsRate data={scoreData} />,
    FINAL: <FinalScore data={scoreData} />,
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="w-full flex  justify-center">
          <Spinner label="Loading..." />
        </div>
      </div>
    );

  return (
    <main className="min-h-screen">
      {!scoreData?.score?.active ? (
        <div className="w-full h-screen flex items-center  justify-center">
          <p>This page is available!</p>
        </div>
      ) : (
        renderView[scoreData?.score?.type]
      )}
    </main>
  );
}
