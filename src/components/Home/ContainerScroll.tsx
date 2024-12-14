"use client";

import img from "@/images/img1.webp";
import { people } from "@/lib/Data/DemoData";
import { motion } from "framer-motion";
import { Passero_One } from "next/font/google";
import Image from "next/image";
import { AnimatedTooltip } from "../web/animated-tooltip";
import { ContainerScroll } from "../web/container-scroll-animation";
import { TypewriterEffectSmooth } from "../web/typewriter-effect";
const abeezee = Passero_One({ weight: "400", subsets: ["latin"] });
export default function ContainerScrollAnimation() {
  const words = [
    {
      text: "Make",
    },
    {
      text: "Your ",
    },
    {
      text: "Email",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="caption-top text-4xl font-bold md:text-6xl lg:text-8xl 2xl:text-9xl">
                <TypewriterEffectSmooth words={words} />
                <span>With</span>
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%"], // Animate gradient position
                    opacity: [0, 1], // Fade in effect
                  }}
                  transition={{
                    duration: 3, // Duration of the gradient animation
                    delay: 3, // Delay before animation starts
                    repeat: Infinity, // Infinite loop
                    repeatType: "reverse", // Reverse direction for smooth looping
                  }}
                  className="mx-5 mb-0 bg-gradient-to-tr from-green-500 via-sky-400 to-cyan-400 bg-clip-text text-6xl text-transparent md:text-6xl lg:text-8xl 2xl:text-[9rem]"
                  style={{
                    backgroundSize: "200% 200%", // For smooth gradient animation
                  }}
                >
                  <span className={`${abeezee.className}`}>DROPEX</span>
                </motion.span>
              </h1>
              <div className="my-5 mt-10 flex items-center justify-center">
                <AnimatedTooltip items={people} />
              </div>
              <p className="mt-6 max-w-2xl text-lg md:text-xl lg:text-2xl">
                Save time and cut costs with Dropex! Integrate our drag-and-drop
                builder into your SaaS, CRM, or ESP to create and send stunning
                email templates effortlessly
              </p>
            </div>
          </>
        }
      >
        <Image
          src={img}
          alt="hero"
          height={1020}
          width={1400}
          className="mx-auto h-full rounded-2xl object-contain object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
