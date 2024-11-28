import { useEffect, useState } from "react";

interface JsonElement {
  tag: string;
  attributes: Record<string, string>;
  children: JsonElement[];
  content: string | null;
}

interface JsonOutput {
  html: JsonElement[];
}

const useHtmlToJson = (htmlString: string): JsonOutput | null => {
  const [jsonOutput, setJsonOutput] = useState<JsonOutput | null>(null);

  useEffect(() => {
    if (!htmlString) return;

    const htmlToJson = (html: string): JsonOutput => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const elementToJson = (element: Element): JsonElement => {
        const obj: JsonElement = {
          tag: element.tagName.toLowerCase(),
          attributes: {},
          children: [],
          content: element.textContent?.trim() || null,
        };

        // Extract attributes
        Array.from(element.attributes).forEach((attr) => {
          obj.attributes[attr.name] = attr.value;
        });

        // Process child nodes recursively
        Array.from(element.children).forEach((child) => {
          obj.children.push(elementToJson(child));
        });

        // Clear content if children exist
        if (obj.children.length > 0) {
          obj.content = null;
        }

        return obj;
      };

      const bodyChildren = Array.from(doc.body.children).map((child) =>
        elementToJson(child)
      );

      return { html: bodyChildren };
    };

    const parsedJson = htmlToJson(htmlString);
    setJsonOutput(parsedJson);
  }, [htmlString]);

  return jsonOutput;
};

export default useHtmlToJson;
