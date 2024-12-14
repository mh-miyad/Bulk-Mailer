import ContainerScrollAnimation from "@/components/Home/ContainerScroll";
import { AnimatedTestimonials } from "@/components/web/animated-testimonials";
import BrandMarquee from "@/components/web/infinite-moving-cards";
import { testimonials } from "@/lib/Data/DemoData";
const Home = () => {
  return (
    <>
      <section className="relative h-auto overflow-hidden backdrop-blur-2xl dark:bg-slate-900/30">
        {/* effect */}

        <div className="pointer-events-none absolute left-[30%] top-[40%] size-72 rounded-s-full bg-sky-500/50 blur-2xl"></div>
        <div className="pointer-events-none absolute right-[20%] top-1/2 size-72 rounded-e-full bg-green-500/40 blur-2xl"></div>
        <div className="animate-infinite animate-ease-linear pointer-events-none absolute left-0 top-32 size-20 animate-pulse rounded-full bg-blue-500/70 blur-2xl xl:left-1/4 xl:top-32 xl:size-52"></div>
        <div className="animate-infinite animate-ease-linear pointer-events-none absolute right-[45%] top-32 size-20 animate-pulse rounded-full bg-fuchsia-500/70 blur-3xl lg:size-32 xl:top-32"></div>

        {/* effect */}
        <div className="container relative mx-auto px-4 pt-40">
          <ContainerScrollAnimation />
        </div>
      </section>
      <section>
        <BrandMarquee />
      </section>
      <section>
        <AnimatedTestimonials autoplay={true} testimonials={testimonials} />
      </section>
    </>
  );
};

export default Home;
