import { ChallengeSection } from "./ChallengeSection";
import { HeroBanner } from "./HeroBanner";
import { HomeBottomNav } from "./HomeBottomNav";
import { HomeSidebar } from "./HomeSidebar";
import { HomeTopNav } from "./HomeTopNav";
import { SiteFooter } from "./SiteFooter";
import { WhyLogicBanner } from "./WhyLogicBanner";

export function HomePage() {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FFF8EC]">
      <HomeTopNav />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10">
          <HeroBanner />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
            <div className="min-w-0 flex-1">
              <ChallengeSection />
            </div>
            <HomeSidebar />
          </div>

          <WhyLogicBanner />
        </div>
      </main>

      <SiteFooter />
      <HomeBottomNav />
    </div>
  );
}
