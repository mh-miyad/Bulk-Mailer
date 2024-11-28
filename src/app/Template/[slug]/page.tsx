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
import { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { toast } from "sonner";

const PreviewPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);
  const { htmlArray, addHtml, updateHtml } = useStore(); // Add updateHtml method
  const [showEdit, setShowEdit] = useState(false);
  const emailEditorRef = useRef<EditorRef>(null);
  const [openModal, setOpenModal] = useState(false);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.slug);
      // setLoading(false);
    };

    fetchParams();
  }, [params]);

  const currentTemplate = htmlArray.find(
    (template) => template.templateId === id
  );

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      const template = {
        templateName:
          templateName || currentTemplate?.templateName || "Unnamed Template",
        templateId: `${id}`, // Use the existing ID
        createdDate: new Date().toISOString(),
        html,
        json: design,
      };

      // If template with same ID exists, update it. Otherwise, add new.
      if (currentTemplate) {
        updateHtml(template);
        toast.success("Template updated successfully");
      } else {
        addHtml(template);
        toast.success("Template added successfully");
      }

      setOpenModal(false);
    });
  };

  const handleEdit = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (currentTemplate?.json) {
      // setLoading(true);
      unlayer?.loadDesign(currentTemplate?.json);
      // setLoading(false);
      setShowEdit(true);
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

  const onReady: EmailEditorProps["onReady"] = (unlayer: any) => {
    if (currentTemplate?.json) {
      unlayer.loadDesign(currentTemplate.json);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center px-10 my-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl">Preview Template</h2>
        <div className="flex gap-5 items-center">
          <Button
            onClick={handleEdit}
            className="py-6 rounded-full font-bold uppercase tracking-wider"
          >
            Edit Template
          </Button>
          {showEdit && (
            <Button
              onClick={handleOpenModal}
              variant={"secondary"}
              className="px-10 py-6 rounded-full font-bold uppercase tracking-wider"
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
    </div>
  );
};

export default PreviewPage;
