// components/rate-cards.tsx

import { Rate } from "../types/typesReports"
import RateCard from "./Rates"




export type RateCardsProps = {
  rates: Rate[]
}

export function RateCards({ rates }: RateCardsProps) {
  return (
    <section aria-label="Rates overview" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {rates.map((r) => (
        <RateCard key={r.id} rate={r} />
      ))}
    </section>
  )
}

export default RateCards