import { ActivityScore, GeneralScore, ProjectsScore } from "@/components/links";
import { FinalScore } from "@/components/links/finalScore";
import { ProjectsRate } from "@/components/links/projectsRate";
import { scoreLinks } from "@/fake";

export default function Link({ params }) {
  const scoreLink = scoreLinks?.find((el) => el.linkID === params.linkID);

  const renderView = {
    GENERAL: <GeneralScore />,
    ACTIVITY: <ActivityScore />,
    PROJECTS: <ProjectsScore />,
    PROJECTS_RATE: <ProjectsRate />,
    FINAL: <FinalScore />,
  };
  return (
    <main className="min-h-screen">
     {renderView[scoreLink?.type]}
    </main>
  );
}
