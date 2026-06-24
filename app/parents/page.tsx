"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EncouragementFooter } from "@/components/EncouragementFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getSessionMinutes,
  getSkillsPracticed,
} from "@/features/sudoku/lib/sessionStorage";
import { useEffect, useState } from "react";

const DEFAULT_SKILLS = [
  "Pattern Recognition",
  "Logic",
  "Concentration",
];

export default function ParentsPage() {
  const [minutes, setMinutes] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    setMinutes(getSessionMinutes());
    const practiced = getSkillsPracticed();
    setSkills(practiced.length > 0 ? practiced : []);
  }, []);

  return (
    <main className="mx-auto flex min-h-full w-full max-w-lg flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-sage/20"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">
          For Grown-ups
        </h1>
      </header>

      <div className="flex flex-col gap-6">
        <Card className="rounded-2xl border-sage/40 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Skills Practiced</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {DEFAULT_SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-foreground">
                  <span className="text-sage">
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

        <p className="text-center text-sm text-muted-foreground">
          This is a preview — full progress tracking coming later.
        </p>
      </div>

      <EncouragementFooter refreshKey="parents" className="mt-8" />
    </main>
  );
}
