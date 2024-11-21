/* eslint-disable @typescript-eslint/no-explicit-any */

import { render } from "@react-email/render";

// Function to render templates server-side
export async function fetchTemplates(template: JSX.Element) {
  if (!template) return;

  // Render the provided template and return HTML
  const renderedHtml = await render(template);
  return renderedHtml;
}
