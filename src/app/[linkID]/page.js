import { ActivityScore, GeneralScore, ProjectsScore } from "@/components/links";
import { scoreLinks } from "@/fake";

export default function Link({ params }) {
  const scoreLink = scoreLinks?.find((el) => el.linkID === params.linkID);

  const renderView = {
    GENERAL: <GeneralScore />,
    ACTIVITY: <ActivityScore />,
    PROJECTS: <ProjectsScore />,
  };
  return (
    <main className="min-h-screen">
     {renderView[scoreLink?.type]}
    </main>
  );
}
