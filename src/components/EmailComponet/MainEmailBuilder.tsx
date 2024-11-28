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
import { useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
const MainEmailBuilder = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const { addHtml } = useStore();
  const [openModal, setOpenModal] = useState(false);
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
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setTemplateName("");
    setOpenModal(false);
  };
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    // console.log(unlayer);
  };
  return (
    <div>
      <div>
        <div>
          <Button
            onClick={handleOpenModal}
            variant={"outline"}
            className="mb-5 "
          >
            Export HTML
          </Button>
        </div>

        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          minHeight={"100vh"}
          style={{
            backgroundColor: "black",
          }}
        />
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
    </div>
  );
};

export default MainEmailBuilder;
