"use client";
import useStore from "@/Store/Store";
import { useEffect, useState } from "react";

const PreviewPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const { htmlArray } = useStore();

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

  return (
    <div>
      <div>
        <iframe
          srcDoc={htmlContent}
          width={"100%"}
          className="h-screen"
          title="Email template "
        ></iframe>
      </div>
    </div>
  );
};

export default PreviewPage;
