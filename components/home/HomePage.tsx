import { ChallengeSection } from "./ChallengeSection";
import { HeroBanner } from "./HeroBanner";
import { HomeBottomNav } from "./HomeBottomNav";
import { HomeTopNav } from "./HomeTopNav";
import { WhyLogicBanner } from "./WhyLogicBanner";

export function HomePage() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cream">
      <HomeTopNav />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:px-8 lg:pb-10">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          <HeroBanner />
          <ChallengeSection />
          <WhyLogicBanner />
        </div>
      </main>

      <HomeBottomNav />
    </div>
  );
}
