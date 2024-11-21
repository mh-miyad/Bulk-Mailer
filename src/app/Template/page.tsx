/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Title4Cards from "@/Email/Ecommarce/ecommarce-1";
import Title3Cards from "@/Email/Ecommarce/ecommarce-2";
import StackOverflowTipsEmail from "@/Email/WelcomeMail";
import { render } from "@react-email/render";
import { useEffect, useState } from "react";

// Email templates
const emailTemplates = [
  {
    id: 1,
    title: "Stack Overflow Tips",
    template: <StackOverflowTipsEmail />,
  },
  {
    id: 2,
    title: "Stack Overflow Tips",
    template: <Title4Cards />,
  },
  {
    id: 3,
    title: "Stack Overflow Tips",
    template: <Title3Cards />,
  },
];

const TemplateMailPage = () => {
  // Store rendered HTML templates
  const [renderedTemplates, setRenderedTemplates] = useState<string[]>([]);

  useEffect(() => {
    // Async function to fetch and render all templates
    const fetchData = async () => {
      const renderedHtmlTemplates: string[] = [];

      // Render each template to HTML
      for (const template of emailTemplates) {
        const html = await render(template.template);
        renderedHtmlTemplates.push(html);
      }

      // Set all rendered HTML in state at once
      setRenderedTemplates(renderedHtmlTemplates);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
      {renderedTemplates.map((htmlContent, index) => (
        <div key={index}>
          <ScrollArea>
            {/* Display the rendered HTML in an iframe */}
            <iframe
              srcDoc={htmlContent}
              title={`Email Preview ${index + 1}`}
              className="w-full h-full min-h-screen bg-transparent border rounded-md shadow-lg"
            ></iframe>
          </ScrollArea>
        </div>
      ))}
    </div>
  );
};

export default TemplateMailPage;
