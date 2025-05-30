import Features from "@/components/features-4";
import ContainerScrollAnimation from "@/components/Home/ContainerScroll";
import IntegrationsSection from "@/components/integrations-7";
import FAQsFour from "@/components/web/FAQ";
import Pricing from "@/components/web/Price";
import WallOfLoveSection from "@/components/web/TestimonialNew";
const Home = () => {
  return (
    <>
      <ContainerScrollAnimation />
      <section>
        <Features />
      </section>
      <section>
        <IntegrationsSection />
      </section>
      <Pricing />
      <section>
        <WallOfLoveSection />
      </section>
      <FAQsFour />
    </>
  );
};

export default Home;
