import type { Comparison } from "@/content/site";

const Mark = ({ value }: { value: string }) => {
  if (value === "Yes")
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand/10 text-brand" aria-label="Yes">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6.2 5 8.5l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (value === "Partial")
    return (
      <span className="inline-flex size-6 items-center justify-center" aria-label="Partial">
        <span className="size-3 rounded-full border-[1.5px] border-warn bg-[linear-gradient(90deg,var(--color-warn)_50%,transparent_50%)]" />
      </span>
    );
  if (value === "No")
    return (
      <span className="inline-flex size-6 items-center justify-center text-[#c4c4c4]" aria-label="No">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M2 2l6 6M8 2 2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    );
  return <span className="text-muted" aria-label="Not rated">–</span>;
};

/** Feature-vs-competitor matrix. The first column is always Wise Work's product and is highlighted. */
export const ComparisonTable = ({ comparison }: { comparison: Comparison }) => (
  <div className="w-full">
    <div className="no-scrollbar overflow-x-auto rounded-xl border-2 border-line bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="w-[30%] px-5 py-4 font-mono text-[13px] font-medium tracking-[0.04em] text-muted uppercase">
              Feature
            </th>
            {comparison.competitors.map((name, i) => (
              <th
                key={name}
                scope="col"
                className={`px-3 py-4 text-center text-sm font-medium ${i === 0 ? "bg-brand/[0.06] text-brand" : "text-ink"}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((row) => (
            <tr key={row.feature} className="border-b border-line last:border-0">
              <th scope="row" className="px-5 py-3.5 text-[15px] font-normal text-ink">
                {row.feature}
              </th>
              {row.values.map((value, i) => (
                <td key={i} className={`px-3 py-3.5 text-center ${i === 0 ? "bg-brand/[0.06]" : ""}`}>
                  <Mark value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="mt-3 text-[13px] leading-[1.4] text-muted">{comparison.note}</p>
  </div>
);
