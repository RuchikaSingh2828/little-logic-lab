"use client";

import { AGE_GROUPS } from "./home-data";
import { ActiveAgeCard, LockedAgeCard } from "./AgeChallengeCard";

export function ChallengeSection() {
  return (
    <section id="challenges" className="scroll-mt-24">
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {AGE_GROUPS.map((group) =>
          group.active ? (
            <ActiveAgeCard key={group.id} group={group} />
          ) : (
            <LockedAgeCard key={group.id} group={group} />
          )
        )}
      </div>
    </section>
  );
}
