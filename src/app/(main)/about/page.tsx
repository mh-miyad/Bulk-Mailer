import Features from "@/components/features-4";
import HeroSection from "@/components/hero-section";
import WallOfLoveSection from "@/components/web/TestimonialNew";
import { Timeline } from "@/components/web/timeline";

const timelineData = [
  {
    title: "Phase 1",
    content: (
      <p>We started our journey with a small team of passionate developers.</p>
    ),
  },
  {
    title: "Phase 2",
    content: (
      <p>
        We launched our first product and received amazing feedback from our
        early adopters.
      </p>
    ),
  },
  {
    title: "Phase 3",
    content: (
      <p>
        We expanded our team and started working on new features to make our
        product even better.
      </p>
    ),
  },
  {
    title: "Phase 4",
    content: (
      <p>
        We reached a major milestone with 10,000 active users and secured our
        first round of funding.
      </p>
    ),
  },
];

const AboutPage = () => {
  return (
    <main className="relative h-auto overflow-hidden backdrop-blur-2xl dark:bg-slate-900/30">
      <div className="pointer-events-none absolute left-[0%] top-[10%] size-72 animate-pulse rounded-s-full bg-indigo-700/50 opacity-50 blur-3xl"></div>
      <div className="pointer-events-none absolute right-[0%] top-[12%] size-72 animate-pulse rounded-e-full bg-green-600/50 opacity-50 blur-3xl"></div>
      <div className="animate-infinite animate-ease-linear pointer-events-none absolute left-0 top-32 size-20 animate-pulse rounded-full bg-blue-500/70 blur-2xl xl:left-1/4 xl:top-32 xl:size-52"></div>
      <div className="animate-infinite animate-ease-linear pointer-events-none absolute right-[45%] top-32 size-20 animate-pulse rounded-full bg-fuchsia-500/70 blur-3xl lg:size-32 xl:top-32"></div>
      <div className="relative z-10 mt-20">
        <HeroSection />
      </div>
      <Timeline data={timelineData} />
      <Features />
      <WallOfLoveSection />
    </main>
  );
};

export default AboutPage;
