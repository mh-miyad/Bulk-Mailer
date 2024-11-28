"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { SparklesCore } from "./sparkles";

export function HeaderBrandPart() {
  return (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-sky-100 relative z-20 uppercase">
        Ma<span className="text-sky-400">i</span>ler
        <span className="text-sky-500">X</span>
      </h1>
      <div>
        <Link href={"/dashboard"}>
          <Button
            variant={"link"}
            className="text-white px-10 border py-6 mb-10"
          >
            Dashboard
          </Button>
        </Link>
      </div>
      <div className="w-full mx-auto h-40 relative overflow-hidden">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[10px] w-3/4 blur-lg mx-auto" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4 mx-auto" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-full blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-full" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-slate-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
