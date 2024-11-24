"use client";

import { EmailComponent } from "@/components/EmailComponets/EmailComponets";
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
import { useEmailStore } from "@/Store/emailStore";
import { Body, Container, Head, Html, Preview } from "@react-email/components";
import { render } from "@react-email/render";
import axios from "axios";

import { ArrowLeft, Copy, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function PreviewPage() {
  const { components } = useEmailStore();
  const [open, setOpen] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [sendMailData, setSendMailData] = useState({
    to: "miyad@royex.net",
    subject: "Eyaana Campaign Dubai",
    html: null,
    // email: "miyad@resend-demo.com",
    email: "onboarding@resend.dev",
  });
  const handleSendTestEmail = async () => {
    if (htmlOfEmail === "") {
      toast.error("Please copy html first");
      return;
    }
    const data = {
      to: sendMailData.to,
      subject: sendMailData.subject,
      email: sendMailData.email,
    };
    setLoading(true);
    const respose = await axios.post("http://localhost:3000/api/send", {
      data,
      htmlOfEmail,
    });
    if (respose) {
      setLoading(false);
    }
  };
  return (
    <>
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
              <Button className="gap-2" onClick={() => setOpen(true)}>
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
                defaultValue="onboarding@resend.dev"
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
              {loading ? "loading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
