import { AnimatedTestimonials } from "@/components/web/animated-testimonials";
import { testimonials } from "@/lib/Data/DemoData";
import Image from "next/image";
import img from "../../images/img1.webp";
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
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-7xl md:text-6xl 2xl:text-9xl font-bold caption-top ">
              Efficiency At
              <br />
              Your Fingertips
            </h1>
            <p className="mt-6 text-lg md:text-xl lg:text-2xl  max-w-2xl">
              With SaaStream, efficiency becomes second nature, allowing you to
              focus on what truly matters in your business journey.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl">
          <Image
            src={img}
            alt="Brand Image "
            className="w-full h-full object-contain"
          />
        </div>
      </section>
      <section>
        <AnimatedTestimonials autoplay={true} testimonials={testimonials} />
      </section>
    </>
  );
};

export default Home;
