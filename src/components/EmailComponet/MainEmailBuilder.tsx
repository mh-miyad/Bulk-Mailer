/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useFirebase } from "@/Authentication/useFirebase";
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
import { cleanHtmlTemplate } from "@/lib/utils";
import useStore from "@/Store/Store";
import axios from "axios";
import { CopyIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

const MainEmailBuilder = () => {
  const fireBase = useFirebase();
  const user = fireBase?.auth.currentUser?.email;
  const emailEditorRef = useRef<EditorRef>(null);
  const { addHtml } = useStore();
  const [openModal, setOpenModal] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [openModalCode, setOpenModalCode] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");
  const [usageCount, setUsageCount] = useState(0);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const firebaseContext = useFirebase();
  const userMail = firebaseContext?.userEmail;
  // const updateExportCount = async (): Promise<boolean> => {
  //   if (!userMail) {
  //     console.error("User not logged in.");
  //     return false;
  //   }

  //   try {
  //     const response = await axios.post("/api/userMail", {
  //       email: userMail,
  //     });

  //     // Check if there is an error in the response
  //     if (response.data.error) {
  //       // If error exists, handle the upgrade modal and return false
  //       if (response.data.error === "Export limit reached") {
  //         setOpenUpgradeModal(true);
  //       }
  //       console.error(response.data.error);
  //       return false;
  //     }

  //     // If exportCount is returned, log it and allow the action
  //     console.log(`Export count: ${response.data.exportCount}`);
  //     return true;
  //   } catch (error) {
  //     console.error("Failed to update export count:", error);
  //     return false;
  //   }
  // };

  const exportHtml = async () => {
    // const canExport = await updateExportCount();
    // if (!canExport) return;

    const unlayer = await emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;

      const template = {
        templateName,
        templateId: uuidv4(),
        createdDate: new Date().toISOString(),
        html,
        json: design,
      };

      const result = await axios.post(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : `${process.env.NEXT_PRODUCTION_URL}`
        }/api/uploadmail`,
        {
          templateName,
          createdDate: new Date().toISOString(),
          htmlOfEmail: `${html}`,
          userEmail: user,
          json: `${design}`,
        },
      );
      if (result.data) {
        console.log(result.data);
        toast.success("Template added successfully");
        setOpenModal(false);
      }

      addHtml(template);
      toast.success("Template added successfully");
      setOpenModal(false);
    });
  };

  const showCode = async () => {
    const unlayer = await emailEditorRef.current?.editor;
    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      setOpenModalCode(true);
      const cleanedHtml = cleanHtmlTemplate(html);
      setHtmlCode(cleanedHtml);
    });
  };

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(htmlCode);
    toast.success("HTML code copied to clipboard");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setTemplateName("");
    setOpenModal(false);
  };
  const closeModalCode = () => {
    setOpenModalCode(false);
  };
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // console.log(unlayer);
  };

  return (
    <div className="relative">
      <div>
        <div className="flex items-center gap-6">
          <Button
            onClick={handleOpenModal}
            variant={"outline"}
            className="mb-5"
          >
            Export HTML
          </Button>
          <Button onClick={showCode} variant={"default"} className="mb-5">
            Show Code
          </Button>
        </div>
        <Link
          href={`https://my-portfolio-v3-teal.vercel.app`}
          target="_blank"
          className="absolute bottom-0 right-0 flex h-12 w-full items-center justify-center bg-white font-bold text-blue-500 underline xl:max-w-[350px] 2xl:max-w-[450px]"
        >
          By MH Miyad
        </Link>
        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          style={{ height: "100vh", width: "100%" }}
        />
      </div>

      <Dialog open={openModal} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Your Email Template</DialogTitle>
            <DialogDescription>
              Export your email template as a HTML and JSON file. This will
              allow you to share your template with others or use it in your
              email marketing campaigns.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name" className="text-xl font-thin">
              Template Name
            </Label>
            <Input
              id="name"
              defaultValue="Template Name"
              placeholder="Write your template name"
              className="col-span-3"
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={exportHtml}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openModalCode} onOpenChange={closeModalCode}>
        <DialogContent className="h-screen w-full max-w-4xl overflow-hidden">
          <Button size={"icon"} variant={"outline"} onClick={copyToClipboard}>
            <CopyIcon />
          </Button>
          <div className="w-full max-w-4xl overflow-hidden">
            <SyntaxHighlighter
              language="html"
              style={atomDark}
              wrapLongLines={true}
              customStyle={{
                width: "100%",
                height: "100%",
                padding: "20px",
                maxWidth: "100%",
                borderRadius: "5px",
                overflowY: "auto",
                overflowX: "auto",
                backgroundColor: "var(--surface-0)",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {htmlCode}
            </SyntaxHighlighter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUpgradeModal}
        onOpenChange={() => setOpenUpgradeModal(false)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upgrade Required</DialogTitle>
            <DialogDescription>
              You have reached the limit of 3 free uses of the template builder.
              Please visit our pricing page to upgrade your plan and continue
              using this feature.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => (window.location.href = "/pricing")}
            >
              Go to Pricing Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainEmailBuilder;
