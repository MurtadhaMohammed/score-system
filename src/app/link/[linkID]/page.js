"use client";

import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ActivityScore, GeneralScore, ProjectsScore } from "@/components/links";
import { FinalScore } from "@/components/links/finalScore";
import { ProjectsRate } from "@/components/links/projectsRate";
import { scoreLinks } from "@/fake";
import { usePathname, useParams } from "next/navigation";
import { useAppStore } from "@/stores";
import { axios } from "@/lib";

export default function Link() {
  const { setLoading, loading } = useAppStore();
  const params = useParams();

  const { linkID } = params;

  const [scoreData, setScoreData] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get(`/score/${linkID}`).then((res) => {
      setScoreData(res.data.data);
      console.log(res.data.data.score.type);
      setLoading(false);
    });
  }, [linkID]);

  // console.log(router);

  // const scoreLink = scoreLinks?.find((el) => el.linkID === params.linkID);

  const renderView = {
    GENERAL: <GeneralScore data={scoreData} />,
    ACTIVITY: <ActivityScore data={scoreData} />,
    PROJECTS: <ProjectsScore data={scoreData} />,
    PROJECTS_RATE: <ProjectsRate data={scoreData} />,
    FINAL: <FinalScore data={scoreData} />,
  };

  return (
    <main className="min-h-screen">
      {loading ? (
        <div className="h-screen flex flex-col justify-center">
          <div className="w-full flex  justify-center">
            <Spinner label="Loading..." />
          </div>
        </div>
      ) : (
        renderView[scoreData?.score?.type]
      )}
    </main>
  );
}
