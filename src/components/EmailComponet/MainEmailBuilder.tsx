/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import useStore from "@/Store/Store";
import { useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
const MainEmailBuilder = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const { addHtml } = useStore();
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
      };

      addHtml(template);
      toast.success("Template added successfully");
    });
  };
  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    console.log(unlayer);
  };
  return (
    <div>
      <div>
        <div>
          <Button onClick={exportHtml} variant={"outline"} className="mb-5 ">
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
    </div>
  );
};

export default MainEmailBuilder;
