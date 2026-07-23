"use client";

import { AGE_GROUPS } from "./home-data";
import { ActiveAgeCard, LockedAgeCard } from "./AgeChallengeCard";

export function ChallengeSection() {
  return (
    <section
      id="challenges"
      className="scroll-mt-24"
      aria-labelledby="challenges-heading"
    >
      <h2
        id="challenges-heading"
        className="mb-4 font-heading text-lg font-extrabold text-[#2D3748] sm:mb-5 sm:text-xl"
      >
        Choose a learning path
      </h2>
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
