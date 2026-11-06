import { TeamBoard } from "../team-board"
import { teamsData } from "../teams.data"
import TeamsTabSkeleton from "@/components/skeletons/teams-tab-skeleton"

interface TeamsTabProps {
  isLoading?: boolean
}

const TeamsTab = ({ isLoading = false }: TeamsTabProps) => {
  if (isLoading) {
    return <TeamsTabSkeleton />
  }

  return (
    <section className="mt-6 overflow-x-auto">
      <TeamBoard teams={teamsData} />
    </section>
  )
}

export default TeamsTab