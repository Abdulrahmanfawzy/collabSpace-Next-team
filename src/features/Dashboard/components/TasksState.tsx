// components/task-stats.tsx

import { getStates } from "../constants/DataState"
import CompletionRateCard from "./CompletionCard"
import StatCard from "./StateCard"
import type { DashboardData } from "../types/typesDashboard"

function TaskStats({ items }: { items?: DashboardData | null }) {
    const stats = getStates(items)
    return (
        <section
            aria-label="Task overview"
            className=" grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
            {stats.map((s) => (
                <StatCard key={s.title} stat={s} />
            ))}
            <CompletionRateCard rate={33} change={items?.overview.tasks.completed_percentage} />
        </section>
    )
}

export default TaskStats
