import { AGE_GROUPS } from "./home-data";
import { ActiveAgeCard, LockedAgeCard } from "./AgeChallengeCard";

function ChallengeSectionHeader() {
  return (
    <header className="mb-4 sm:mb-6">
      <h2 className="text-base font-bold text-[#2D2A26] sm:text-xl">
        🌱 Choose your challenge
      </h2>
      <p className="mt-1 text-xs text-[#7A756D] sm:text-sm">
        Select an age group to begin your learning adventure.
      </p>
    </header>
  );
}

export function ChallengeSection() {
  return (
    <section id="challenges" className="scroll-mt-20">
      <ChallengeSectionHeader />

      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-5">
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
