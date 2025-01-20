import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanHtmlTemplate = (htmlContent: string | null): string => {
  // Handle case when htmlContent is null
  if (!htmlContent) {
    return "";
  }
  const removePatterns = [
    /<!--\[if[^]*?\[endif\]-->/gi,
    /<!DOCTYPE[^>]*>/gi,
    /<title>[^]*?<\/title>/gi,
    /<meta[^>]*>/gi,
    /<html[^>]*>/gi,
    /<\/html>/gi,
  ];

  // Apply each regex pattern to the content
  let cleanedContent = htmlContent;
  removePatterns.forEach((pattern) => {
    cleanedContent = cleanedContent.replace(pattern, "");
  });
  cleanedContent = cleanedContent
    .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
    .replace(/>[\r\n\s]*</g, "><") // Remove spaces and newlines between tags
    .replace(/<!--.*?-->/g, "") // Remove HTML comments
    .replace(/\s*=\s*/g, "=") // Remove spaces around '=' in attributes
    .replace(/"\s+/g, '"') // Remove trailing spaces after attribute values
    .replace(/\s+"/g, '"') // Remove leading spaces before attribute values
    .trim(); // Trim any remaining whitespace
  return cleanedContent;
};
