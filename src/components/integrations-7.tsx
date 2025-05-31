import { InfiniteSlider } from "@/components/infinite-slider";
import {
  Gemini,
  GooglePaLM,
  MagicUI,
  MediaWiki,
  Replit,
  VSCodium,
} from "@/components/logos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IntegrationsSection() {
  return (
    <section>
      <div className="bg-muted pb-20 dark:bg-background">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="group relative mx-auto max-w-7xl items-center justify-between space-y-6 bg-muted/25 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] sm:max-w-xl">
            <div
              role="presentation"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
            ></div>
            <div>
              <InfiniteSlider gap={24} speed={10} speedOnHover={10}>
                <IntegrationCard>
                  <VSCodium />
                </IntegrationCard>
                <IntegrationCard>
                  <MediaWiki />
                </IntegrationCard>
                <IntegrationCard>
                  <GooglePaLM />
                </IntegrationCard>
                <IntegrationCard>
                  <Gemini />
                </IntegrationCard>
                <IntegrationCard>
                  <Replit />
                </IntegrationCard>
                <IntegrationCard>
                  <MagicUI />
                </IntegrationCard>
              </InfiniteSlider>
            </div>

            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10} reverse>
                <IntegrationCard>
                  <Gemini />
                </IntegrationCard>
                <IntegrationCard>
                  <Replit />
                </IntegrationCard>
                <IntegrationCard>
                  <MediaWiki />
                </IntegrationCard>
                <IntegrationCard>
                  <MagicUI />
                </IntegrationCard>
                <IntegrationCard>
                  <VSCodium />
                </IntegrationCard>
                <IntegrationCard>
                  <GooglePaLM />
                </IntegrationCard>
              </InfiniteSlider>
            </div>
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
                <IntegrationCard>
                  <Replit />
                </IntegrationCard>
                <IntegrationCard>
                  <MagicUI />
                </IntegrationCard>
                <IntegrationCard>
                  <Gemini />
                </IntegrationCard>
                <IntegrationCard>
                  <VSCodium />
                </IntegrationCard>
                <IntegrationCard>
                  <MediaWiki />
                </IntegrationCard>
                <IntegrationCard>
                  <GooglePaLM />
                </IntegrationCard>
              </InfiniteSlider>
            </div>

            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10} reverse>
                <IntegrationCard>
                  <Gemini />
                </IntegrationCard>
                <IntegrationCard>
                  <Replit />
                </IntegrationCard>
                <IntegrationCard>
                  <MediaWiki />
                </IntegrationCard>
                <IntegrationCard>
                  <MagicUI />
                </IntegrationCard>
                <IntegrationCard>
                  <VSCodium />
                </IntegrationCard>
                <IntegrationCard>
                  <GooglePaLM />
                </IntegrationCard>
              </InfiniteSlider>
            </div>
            <div>
              <InfiniteSlider gap={24} speed={20} speedOnHover={10}>
                <IntegrationCard>
                  <Replit />
                </IntegrationCard>
                <IntegrationCard>
                  <MagicUI />
                </IntegrationCard>
                <IntegrationCard>
                  <Gemini />
                </IntegrationCard>
                <IntegrationCard>
                  <VSCodium />
                </IntegrationCard>
                <IntegrationCard>
                  <MediaWiki />
                </IntegrationCard>
                <IntegrationCard>
                  <GooglePaLM />
                </IntegrationCard>
              </InfiniteSlider>
            </div>

            <div className="absolute left-1/2 top-1/2 m-auto flex size-fit -translate-x-1/2 -translate-y-1/2 justify-center gap-2">
              <IntegrationCard
                className="shadow-black-950/10 size-auto bg-white/25 px-5 py-3 shadow-xl backdrop-blur-md backdrop-grayscale dark:border-white/10 dark:shadow-white/15"
                isCenter={true}
              >
                <span className="bg-gradient-to-br from-cyan-500 via-sky-400 to-cyan-300 bg-clip-text text-xl font-bold uppercase text-transparent">
                  Dropex
                </span>
              </IntegrationCard>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-lg space-y-6 text-center">
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Integrate with your favorite tools
            </h2>
            <p className="text-muted-foreground">
              Connect seamlessly with popular platforms and services to enhance
              your workflow.
            </p>

            <Button variant="outline" size="sm" asChild>
              <Link href="#">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  children,
  className,
  isCenter = false,
}: {
  children: React.ReactNode;
  className?: string;
  position?:
    | "left-top"
    | "left-middle"
    | "left-bottom"
    | "right-top"
    | "right-middle"
    | "right-bottom";
  isCenter?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 flex size-12 rounded-full border bg-background",
        className,
      )}
    >
      <div className={cn("m-auto size-fit *:size-5", isCenter && "*:size-8")}>
        {children}
      </div>
    </div>
  );
};
