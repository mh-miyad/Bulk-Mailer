"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQsFour() {
  const faqItems = [
    {
      id: "item-1",
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery.",
    },
    {
      id: "item-2",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.",
    },
    {
      id: "item-3",
      question: "Can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.",
    },
    {
      id: "item-4",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's import regulations.",
    },
    {
      id: "item-5",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some specialty items may have different return terms, which will be noted on the product page.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1520px] px-4 md:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-2xl bg-muted p-1 dark:bg-muted/50"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:bg-card data-[state=open]:shadow-sm dark:data-[state=open]:bg-muted"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          <p className="mt-6 px-8 text-muted-foreground">
            {`  Can't find what you're`} looking for? Contact our{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
