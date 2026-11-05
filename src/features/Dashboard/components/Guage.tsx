const SWEEP = 220

function polar(cx: number, cy: number, r: number, angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arc(cx: number, cy: number, r: number, from: number, to: number) {
    const start = polar(cx, cy, r, from)
    const end = polar(cx, cy, r, to)
    const large = to - from > 180 ? 1 : 0
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`
}

export default function Gauge({ value }: { value: number }) {
    const cx = 44
    const cy = 46
    const r = 36
    const startAngle = -SWEEP / 2
    const endAngle = SWEEP / 2
    const needleAngle = startAngle + (SWEEP * value) / 100
    const tip = polar(cx, cy, r - 8, needleAngle)

    return (
        <svg
            viewBox="0 0 88 70"
            className="h-17.5 w-22 shrink-0"
            role="img"
            aria-label={`Completion rate ${value}%`}
        >
            {/* track */}
            <path
                d={arc(cx, cy, r, startAngle, endAngle)}
                fill="none"
                strokeWidth={5}
                strokeLinecap="round"
                className="stroke-muted"
            />
            {/* value */}
            <path
                d={arc(cx, cy, r, startAngle, needleAngle)}
                fill="none"
                strokeWidth={5}
                strokeLinecap="round"
                className="stroke-foreground"
            />
            {/* needle */}
            <line
                x1={cx}
                y1={cy}
                x2={tip.x}
                y2={tip.y}
                strokeWidth={2.5}
                strokeLinecap="round"
                className="stroke-orange-500"
            />
            <circle cx={cx} cy={cy} r={3} className="fill-background stroke-foreground" strokeWidth={1.5} />
        </svg>
    )
}