"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const brands = [
  {
    name: "Clientify",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721554218731e1bd7afe2_Frame%2014103.png",
  },
  {
    name: "Fidelity",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721e27837cb92b2fd3dc2_Frame%2014101.png",
  },
  {
    name: "Spendgo",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665722404874ce9e550c083e_Frame%2014105.png",
  },
  {
    name: "Lightspeed",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721b8b5d1af5da2bfe547_Frame%2014097.png",
  },
  {
    name: "User",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/6657224d9af5c5df542fb31b_Frame%2014109.png",
  },
  {
    name: "Inbox Marketer",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721acac5d1a8170cdb7a3_Frame%2014098.png",
  },
  {
    name: "Clientify",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721554218731e1bd7afe2_Frame%2014103.png",
  },
  {
    name: "Fidelity",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721e27837cb92b2fd3dc2_Frame%2014101.png",
  },
  {
    name: "Spendgo",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665722404874ce9e550c083e_Frame%2014105.png",
  },
  {
    name: "Lightspeed",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721b8b5d1af5da2bfe547_Frame%2014097.png",
  },
  {
    name: "User",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/6657224d9af5c5df542fb31b_Frame%2014109.png",
  },
  {
    name: "Inbox Marketer",
    logo: "https://cdn.prod.website-files.com/64f144bd2210c380b36050cd/665721acac5d1a8170cdb7a3_Frame%2014098.png",
  },
];

export default function BrandMarquee() {
  return (
    <div className="my-10 w-full overflow-hidden backdrop-blur-2xl dark:bg-slate-700">
      <Marquee
        delay={4}
        pauseOnHover={true}
        loop={10000}
        gradient={false}
        play={true}
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex h-auto w-full items-center gap-10 px-4"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              className="size-56 object-contain"
              width={300}
              height={100}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
