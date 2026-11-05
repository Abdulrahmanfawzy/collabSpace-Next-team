import { TeamBoard } from "../team-board"
import { teamsData } from "../teams.data"


const TeamsTab = () => {
   
  return (
    
     <section className="mt-6 overflow-x-auto">
          <TeamBoard teams={teamsData}/>
    </section>

      
   
  )
}

export default TeamsTab