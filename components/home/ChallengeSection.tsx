import { AGE_GROUPS } from "./home-data";
import { ActiveAgeCard, LockedAgeCard } from "./AgeChallengeCard";

export function ChallengeSection() {
  return (
    <section id="challenges" className="scroll-mt-20">
      <header className="mb-5 sm:mb-6">
        <h2 className="text-lg font-bold text-[#2D2A26] sm:text-2xl">
          🌱 Choose your challenge
        </h2>
        <p className="mt-1.5 text-sm text-[#7A756D] sm:text-base">
          Select an age group to begin your learning adventure.
        </p>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
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
