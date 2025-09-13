import FAQsFour from "@/components/web/FAQ";
import Pricing from "@/components/web/Price";

const PricePage = () => {
  return (
    <main className="relative h-auto overflow-hidden backdrop-blur-2xl dark:bg-slate-900/30">
      <div className="pointer-events-none absolute left-[0%] top-[10%] size-72 animate-pulse rounded-s-full bg-indigo-700/50 opacity-50 blur-3xl"></div>
      <div className="pointer-events-none absolute right-[0%] top-[12%] size-72 animate-pulse rounded-e-full bg-green-600/50 opacity-50 blur-3xl"></div>
      <div className="animate-infinite animate-ease-linear pointer-events-none absolute left-0 top-32 size-20 animate-pulse rounded-full bg-blue-500/70 blur-2xl xl:left-1/4 xl:top-32 xl:size-52"></div>
      <div className="animate-infinite animate-ease-linear pointer-events-none absolute right-[45%] top-32 size-20 animate-pulse rounded-full bg-fuchsia-500/70 blur-3xl lg:size-32 xl:top-32"></div>
      <Pricing />
      <FAQsFour />
    </main>
  );
};

export default PricePage;
