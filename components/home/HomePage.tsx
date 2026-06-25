import { ChallengeSection } from "./ChallengeSection";
import { HeroBanner } from "./HeroBanner";
import { HomeBottomNav } from "./HomeBottomNav";
import { HomeTopNav } from "./HomeTopNav";
import { WhyLogicBanner } from "./WhyLogicBanner";

export function HomePage() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cream">
      <HomeTopNav />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-5 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <HeroBanner />
          <ChallengeSection />
          <WhyLogicBanner />
        </div>
      </main>

      <HomeBottomNav />
    </div>
  );
}
