// components/task-stats.tsx

import { stats } from "../constants/DataState"
import CompletionRateCard from "./CompletionCard"
import StatCard from "./StateCard"






function TaskStats() {
    return (
        <section
            aria-label="Task overview"
            className=" grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
            {stats.map((s) => (
                <StatCard key={s.title}  stat={s} />
            ))}
            <CompletionRateCard rate={33} change={22} />
        </section>
    )
}

export default TaskStats