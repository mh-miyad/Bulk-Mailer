"use client";

import { EmailComponent } from "@/components/EmailComponets/EmailComponets";
import { Button } from "@/components/ui/button";
import { useEmailStore } from "@/Store/emailStore";
import { Body, Container, Head, Html, Preview } from "@react-email/components";
import { render } from "@react-email/render";
import { ArrowLeft, Copy, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function PreviewPage() {
  const { components } = useEmailStore();
  const [htmlOfEmail, setHtmlOfEmail] = useState("");
  const handleCopyHtml = async () => {
    const emailHtml = await render(
      <Html>
        <Head />
        <Preview>Email Preview</Preview>
        <Body style={{ fontFamily: "Arial, sans-serif" }}>
          <Container>
            {components.map((component, index) => (
              <EmailComponent key={index} component={component} preview />
            ))}
          </Container>
        </Body>
      </Html>
    );
    setHtmlOfEmail(emailHtml);
    navigator.clipboard.writeText(emailHtml);
    toast("Html copied to clipboard", {
      description: "Copied to clipboard",
      position: "bottom-right",
      action: {
        label: "Undo",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };
  const handleSaveAsTemplate = () => {
    console.log(htmlOfEmail);
    toast("Save as template", {
      description: `${Date.now()}.html`,
      position: "bottom-right",
      action: {
        label: "Undo",
        onClick: () => {
          navigator.clipboard.writeText("");
          setHtmlOfEmail("");
          toast.dismiss();
        },
      },
    });
  };
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/EmailBuilder">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Editor
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCopyHtml}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy HTML
            </Button>
            <Button className="gap-2" onClick={handleSaveAsTemplate}>
              Save As Template
            </Button>
            <Button className="gap-2">
              <Eye className="h-4 w-4" />
              Send Test Email
            </Button>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-950 border rounded-lg shadow-md p-8 max-w-[600px] mx-auto">
          {components.map((component, index) => (
            <EmailComponent key={index} component={component} preview />
          ))}
        </div>
      </div>
    </div>
  );
}
