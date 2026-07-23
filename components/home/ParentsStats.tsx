"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalGamesPlayedAllModes } from "@/features/sudoku/lib/progressStorage";
import {
  getSessionMinutes,
  getSkillsPracticed,
} from "@/features/sudoku/lib/sessionStorage";

const DEFAULT_SKILLS = [
  "Pattern Recognition",
  "Logic",
  "Concentration",
];

export function ParentsStats() {
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    setTotalGamesPlayed(getTotalGamesPlayedAllModes());
    setMinutes(getSessionMinutes());
    const practiced = getSkillsPracticed();
    setSkills(practiced.length > 0 ? practiced : []);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-2xl border-sage/40 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Games Played</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold text-foreground">
            {totalGamesPlayed}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sudoku puzzles completed across all age groups.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-sage/40 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Skills Practiced</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {DEFAULT_SKILLS.map((skill) => (
              <li
                key={skill}
                className="flex items-center gap-2 text-foreground"
              >
                <span className="text-sage" aria-hidden>
                  {skills.includes(skill) ? "✓" : "○"}
                </span>
                {skill}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-sage/40 bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Time Spent Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold text-foreground">
            {minutes} {minutes === 1 ? "minute" : "minutes"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Rough estimate based on puzzle play time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
