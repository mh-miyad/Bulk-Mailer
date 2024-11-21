"use client";

import WelcomeMail from "@/Email/WelcomeMail";
import { render } from "@react-email/render";
import { useEffect, useState } from "react";

const PreviewPage = () => {
  const [emailTemplate, setEmailTemplate] = useState<string>("");

  useEffect(() => {
    const generateEmail = async () => {
      const emailHtml = await render(<WelcomeMail />);
      setEmailTemplate(emailHtml);
    };

    generateEmail();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center my-4">Email Preview</h1>
        {/* Render the email in an iframe */}
        <iframe
          srcDoc={emailTemplate}
          className="w-full h-[80vh] border rounded-md shadow-lg"
          style={{ border: "1px solid #ddd" }}
          title="Email Preview"
        />
      </div>
    </div>
  );
};

export default PreviewPage;
