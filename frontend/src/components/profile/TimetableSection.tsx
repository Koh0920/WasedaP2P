import { useState } from "react";
import type { Timetable, TimetableEntry } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const DAYS: TimetableEntry["day"][] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const PERIODS: TimetableEntry["period"][] = [1, 2, 3, 4, 5, 6];

const PERIOD_TIMES: Record<number, string> = {
  1: "8:50–10:30",
  2: "10:40–12:20",
  3: "13:10–14:50",
  4: "15:05–16:45",
  5: "16:55–18:35",
  6: "18:45–20:25",
};

function TimetableGrid({ timetable }: { timetable: Timetable }) {
  const getEntry = (day: TimetableEntry["day"], period: TimetableEntry["period"]) =>
    timetable.entries.find((e) => e.day === day && e.period === period);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left text-zinc-400 font-normal pb-3 pr-4 w-24">Period</th>
            {DAYS.map((day) => (
              <th key={day} className="text-center text-zinc-400 font-normal pb-3 px-1 min-w-[100px]">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERIODS.map((period) => (
            <tr key={period}>
              <td className="py-1.5 pr-4 align-top">
                <span className="text-zinc-400">{period}</span>
                <br />
                <span className="text-zinc-300 text-[10px] leading-tight">{PERIOD_TIMES[period]}</span>
              </td>
              {DAYS.map((day) => {
                const entry = getEntry(day, period);
                return (
                  <td key={day} className="py-1.5 px-1 align-top">
                    {entry ? (
                      <div className={cn("rounded-lg px-2 py-2 bg-orange-50")}>
                        <p className="font-medium text-zinc-800 leading-tight">{entry.courseName}</p>
                        <p className="text-zinc-500 text-[10px] mt-0.5 truncate">{entry.professor}</p>
                        <p className="text-zinc-400 text-[10px]">{entry.room}</p>
                      </div>
                    ) : (
                      <div className="h-16 rounded-lg bg-zinc-50" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TimetableSectionProps {
  timetables: Timetable[];
}

export function TimetableSection({ timetables }: TimetableSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!timetables || timetables.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-medium text-zinc-900 mb-4">Timetable</h2>
        <p className="text-sm text-zinc-400">No timetable data yet.</p>
      </div>
    );
  }

  const current = timetables[0];
  const past = timetables.slice(1);

  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-6">Timetable</h2>

      <Tabs defaultValue="current">
        <TabsList className="bg-zinc-100 mb-6">
          <TabsTrigger value="current" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
            {current.semester} {current.year}
          </TabsTrigger>
          {past.length > 0 && (
            <TabsTrigger value="past" className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Past semesters
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="current">
          <TimetableGrid timetable={current} />
        </TabsContent>

        {past.length > 0 && (
          <TabsContent value="past">
            <div className="space-y-2 mb-4">
              {past.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm transition-colors duration-150 cursor-pointer",
                    selectedIdx === i
                      ? "bg-zinc-100 text-zinc-900 font-medium"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  {t.semester} {t.year}
                </button>
              ))}
            </div>
            <TimetableGrid timetable={past[selectedIdx]} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
