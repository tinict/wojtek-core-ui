function DonutChart({
    data,
    centerText,
    centerSub,
}: {
    data: { label: string; value: number; color: string }[];
    centerText: string;
    centerSub: string;
}) {
    const r = 48;
    const circumference = 2 * Math.PI * r;
    let offset = 0;

    const slices = data.map((d) => {
        const dash = (d.value / 100) * circumference;
        const slice = { ...d, dash, offset };
        offset += dash;
        return slice;
    });

    return (
        <div className="flex flex-col items-center gap-3">
            <svg viewBox="0 0 140 140" className="w-28 h-28" aria-hidden="true">
                {slices.map((s, i) => (
                    <circle
                        key={i}
                        cx={70}
                        cy={70}
                        r={r}
                        fill="none"
                        stroke={s.color}
                        strokeWidth={20}
                        strokeDasharray={`${s.dash} ${circumference - s.dash}`}
                        strokeDashoffset={-s.offset}
                        transform="rotate(-90 70 70)"
                    />
                ))}
                <text
                    x={70}
                    y={65}
                    textAnchor="middle"
                    fontSize={16}
                    fontWeight={500}
                    fill="currentColor"
                >
                    {centerText}
                </text>
                <text
                    x={70}
                    y={80}
                    textAnchor="middle"
                    fontSize={10}
                    fill="#6B7280"
                >
                    {centerSub}
                </text>
            </svg>
            <div className="flex flex-col gap-1.5 w-full">
                {data.map((d) => (
                    <div
                        key={d.label}
                        className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
                    >
                        <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: d.color }}
                        />
                        {d.label} ({d.value}%)
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DonutChart
