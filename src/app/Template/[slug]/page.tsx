/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import useHtmlToJson from "@/hooks/useHtmlToJson";
import useStore from "@/Store/Store";
import { useEffect, useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { toast } from "sonner";

const PreviewPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { htmlArray } = useStore();
  const [showEdit, setShowEdit] = useState(false);
  const emailEditorRef = useRef<EditorRef>(null);
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.slug);
    };

    fetchParams();
  }, [params]);
  const htmlContent = htmlArray.find(
    (template) => template.templateId === id
  )?.html;
  const jsonOutput = useHtmlToJson(`${htmlContent}`);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      alert("export");
      toast.success("Template saved successfully");
      console.log(design, html);
    });
  };

  const handleEdit = () => {
    const unlayer = emailEditorRef.current?.editor;
    setLoading(true);
    unlayer?.loadDesign(jsonOutput);
    setShowEdit(true);
    setLoading(false);
  };
  const onReady: EmailEditorProps["onReady"] = (unlayer: any) => {
    console.log(unlayer);
  };
  return (
    <div>
      <div className="flex justify-between items-center px-10 my-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl ">Preview Template</h2>
        <div className="flex gap-5 items-center">
          <Button
            onClick={handleEdit}
            className="w-32 py-6 rounded-full font-bold uppercase tracking-wider"
          >
            Edit
          </Button>
          {!loading ? (
            <>
              <Button
                onClick={exportHtml}
                variant={"secondary"}
                className="px-10 py-6 rounded-full font-bold uppercase tracking-wider"
              >
                Save Template
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <div>
        {showEdit ? (
          <>
            {" "}
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <EmailEditor
                ref={emailEditorRef}
                onReady={onReady}
                style={{ width: "100%", height: "100vh" }}
              />
            )}
          </>
        ) : (
          <iframe
            srcDoc={htmlContent}
            width={"100%"}
            className="h-screen rounded-xl border"
            title="Email template "
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
