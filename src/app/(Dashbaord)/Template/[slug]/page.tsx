/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { cleanHtmlTemplate } from "@/lib/utils";
import useStore from "@/Store/Store";
import { CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
// Define a more specific type for the JSON template
interface UnlayerDesign {
  counters?: Record<string, number>; // Match JSONTemplate
  body?: any;
  page?: any;
  [key: string]: any; // Allow additional properties
}

interface Template {
  templateName: string;
  templateId: string;
  createdDate: string;
  html: string;
  json?: UnlayerDesign; // Update the json type
}

const PreviewPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { htmlArray, addHtml, updateHtml } = useStore();
  const [showEdit, setShowEdit] = useState(false);
  const emailEditorRef = useRef<EditorRef>(null);
  const [openModalCode, setOpenModalCode] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.slug);
      setLoading(false);
    };

    fetchParams();
  }, [params]);

  const currentTemplate = htmlArray.find(
    (template) => template.templateId === id,
  );

  // const exportHtml = () => {
  //   const unlayer = emailEditorRef.current?.editor;

  //   unlayer?.exportHtml((data) => {
  //     const { design, html } = data;

  //     // Ensure design has the required properties
  //     const completeDesign: UnlayerDesign = {
  //       ...(design || {}),
  //       counters: design?.counters || {},
  //       body: design?.body || {},
  //     };

  //     const template: Template = {
  //       templateName:
  //         templateName || currentTemplate?.templateName || "Unnamed Template",
  //       templateId: `${id}`,
  //       createdDate: new Date().toISOString(),
  //       html,
  //       json: completeDesign,
  //     };

  //     // If template with same ID exists, update it. Otherwise, add new.
  //     if (currentTemplate) {
  //       updateHtml(template);
  //       toast.success("Template updated successfully");
  //     } else {
  //       addHtml(template);
  //       toast.success("Template added successfully");
  //     }

  //     setOpenModal(false);
  //   });
  // };
  const exportHtml = async () => {
    // const canExport = await updateExportCount();
    // if (!canExport) return;

    const unlayer = await emailEditorRef.current?.editor;

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
  const isUnlayerDesign = (json: object): json is UnlayerDesign => {
    return typeof json === "object" && json !== null && "body" in json;
  };

  const handleEdit = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (currentTemplate?.json) {
      setLoading(true);
      try {
        const design = currentTemplate.json as UnlayerDesign;

        // Ensure required properties have default values
        const completeDesign = {
          ...design,
          counters: design.counters || {}, // Ensure counters is a Record<string, number>
          body: design.body || {}, // Ensure body has a default
          page: design.page || {}, // Ensure page has a default
        };

        // Load design into the editor
        unlayer?.loadDesign(completeDesign);
        setLoading(false);
        setShowEdit(true);
      } catch (error) {
        console.error("Failed to load design:", error);
        toast.error("Failed to load template design");
        setLoading(false);
      }
    } else {
      toast.error("No template design found");
    }
  };
  const handleOpenModal = () => {
    setTemplateName(currentTemplate?.templateName || "");
    setOpenModal(true);
  };

  const closeModal = () => {
    setTemplateName("");
    setOpenModal(false);
  };
  const closeModalCode = () => {
    setOpenModalCode(false);
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer: any) => {
    if (currentTemplate?.json) {
      try {
        // Same structure handling on editor ready
        const completeDesign: UnlayerDesign = {
          ...currentTemplate.json,
        };

        unlayer.loadDesign(completeDesign);
      } catch (error) {
        console.error("Failed to load design on ready:", error);
        toast.error("Failed to load template design");
      }
    }
  };

  return (
    <div>
      <div className="my-5 flex items-center justify-between px-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl">Preview Template</h2>
        <div className="flex items-center gap-5">
          <Button
            onClick={handleEdit}
            className="rounded-full py-6 font-bold uppercase tracking-wider"
          >
            Edit Template
          </Button>
          <Button onClick={showCode} variant={"default"} className="mb-5">
            Show Code
          </Button>
          {showEdit && (
            <Button
              onClick={handleOpenModal}
              variant={"secondary"}
              className="rounded-full px-10 py-6 font-bold uppercase tracking-wider"
            >
              Save Template
            </Button>
          )}
        </div>
      </div>
      <div>
        {showEdit ? (
          <EmailEditor
            ref={emailEditorRef}
            onReady={onReady}
            style={{ width: "100%", height: "100vh" }}
          />
        ) : (
          <iframe
            srcDoc={currentTemplate?.html}
            width={"100%"}
            className="h-screen rounded-xl border"
            title="Email template"
          ></iframe>
        )}
      </div>
      <Dialog open={openModal} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Your Email Template</DialogTitle>
            <DialogDescription>
              Export your email template as a HTML and JSON file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name" className="text-xl font-thin">
              Template Name
            </Label>
            <Input
              id="name"
              value={templateName}
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
    </div>
  );
};

export default PreviewPage;
