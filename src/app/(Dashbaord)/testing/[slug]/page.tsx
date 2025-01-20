/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useStore from "@/Store/Store";
import axios from "axios";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TestingPageProps {
  params: Promise<{ slug: string }>;
}

const TestingPageByID: React.FC<TestingPageProps> = ({ params }) => {
  const { htmlArray } = useStore();
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const { slug } = await params;
      if (slug) {
        const template = htmlArray.find((html) => html.templateId === slug);

        setHtmlContent(template?.html || null);
      }
    };
    fetchParams();
  }, [params, htmlArray]);
  const [loading, setLoading] = useState(false);

  const cleanHtmlTemplate = (htmlContent: string | null): string => {
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

  const [sendMailData, setSendMailData] = useState({
    to: "miyad@royex.net",
    subject: "Eyaana Campaign Dubai",
    html: null,
    // email: "miyad@resend-demo.com",
    // email: "mhmiyad21@gmail.com",
    email: "mhmiyad6565@outlook.com",
  });
  const [open, setOpen] = useState(false);
  const handleSendTestEmail = async () => {
    const data = {
      to: sendMailData.to,
      subject: sendMailData.subject,
      email: sendMailData.email,
    };
    console.log(cleanHtmlTemplate(htmlContent));
    setLoading(true);
    const respose = await axios.post(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : `${process.env.NEXT_PRODUCTION_URL}`
      }/api/send`,
      {
        data,
        htmlOfEmail: cleanHtmlTemplate(htmlContent),
      },
    );
    if (respose.data) {
      toast.success("Email sent successfully", {
        description: "Email sent successfully",
        position: "top-right",
      });
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="mb-10 mt-10">
        <Button className="gap-2" onClick={() => setOpen(true)}>
          <Eye className="h-4 w-4" />
          Send Test Email
        </Button>
      </div>
      {htmlContent ? (
        <iframe
          srcDoc={htmlContent}
          title="Email Preview"
          className="h-full min-h-screen w-full rounded-md border bg-transparent shadow-lg"
        ></iframe>
      ) : (
        <p>Template not found.</p>
      )}
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when {`you're `}
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                defaultValue="Eyaana New test Mail"
                className="col-span-3"
                onChange={(e) =>
                  setSendMailData({ ...sendMailData, subject: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="from" className="text-right">
                From
              </Label>
              <Input
                id="from"
                defaultValue="mhmiyad21@gmail.com"
                className="col-span-3"
                onChange={(e) =>
                  setSendMailData({ ...sendMailData, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to" className="text-right">
                To
              </Label>
              <Input
                id="to"
                defaultValue="miyad@royex.net"
                className="col-span-3"
                onChange={(e) =>
                  setSendMailData({ ...sendMailData, to: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSendTestEmail}>
              {loading ? "loading..." : "Send mail"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestingPageByID;
