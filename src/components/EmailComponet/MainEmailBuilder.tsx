/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
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
import { CopyIcon } from "lucide-react";
import { useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

const MainEmailBuilder = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const { addHtml } = useStore();
  const [openModal, setOpenModal] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [openModalCode, setOpenModalCode] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      const template = {
        templateName,
        templateId: uuidv4(),
        createdDate: new Date().toISOString(),
        html,
        json: design,
      };

      addHtml(template);
      toast.success("Template added successfully");
      setOpenModal(false);
    });
  };
  const showCode = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      setOpenModalCode(true);
      setHtmlCode(html);
    });
  };

  const copyToClipboard = () => {
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
        <span className="absolute bottom-0 right-0 h-10 w-full max-w-[350px] dark:bg-slate-950"></span>
        <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </div>

      <Dialog open={openModal} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Your Email Template </DialogTitle>
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
              defaultValue="Template Name "
              placeholder="Write your template name "
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
    </div>
  );
};

export default MainEmailBuilder;
