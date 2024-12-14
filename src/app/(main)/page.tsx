import ContainerScrollAnimation from "@/components/Home/ContainerScroll";
import { AnimatedTestimonials } from "@/components/web/animated-testimonials";
import { testimonials } from "@/lib/Data/DemoData";
const Home = () => {
  return (
    <>
      <section className="relative overflow-hidden h-auto backdrop-blur-2xl dark:bg-slate-900/30 ">
        {/* effect */}

        <div className="size-72  pointer-events-none bg-sky-500/50 rounded-s-full blur-2xl absolute top-[40%] left-[30%] "></div>
        <div className="size-72 pointer-events-none  bg-green-500/40 rounded-e-full blur-2xl absolute top-1/2 right-[20%] "></div>
        <div className="size-52 animate-pulse animate-infinite animate-ease-linear  pointer-events-none bg-blue-500/70 rounded-full blur-2xl absolute top-32  left-1/4 "></div>
        <div className="size-32 animate-pulse animate-infinite animate-ease-linear pointer-events-none  bg-fuchsia-500/70 rounded-full blur-2xl absolute top-32 right-[45%] "></div>

        {/* effect */}
        <div className="container mx-auto px-4  pt-32 relative">
          <ContainerScrollAnimation />
        </div>
      </section>
      <section>
        <AnimatedTestimonials autoplay={true} testimonials={testimonials} />
      </section>
    </>
  );
};

export default Home;
