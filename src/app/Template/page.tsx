/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useStore from "@/Store/Store";
import { useRouter } from "next/navigation";

const TemplateMailPage = () => {
  const { htmlArray, deleteHtml } = useStore();
  const router = useRouter();
  const handleUseTemplate = (id: string) => {
    router.push(`/Template/${id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
      {htmlArray.map((htmlContent, index) => (
        <div key={index}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
              <CardTitle className="text-sm font-medium">
                Email Preview {htmlContent.templateName}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={"destructive"}
                  onClick={() => deleteHtml(index)}
                >
                  {"Delete"}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <iframe
                  srcDoc={htmlContent.html}
                  title={`Email Preview ${index + 1}`}
                  className="w-full h-full min-h-screen bg-transparent border rounded-md shadow-lg"
                ></iframe>
              </ScrollArea>
            </CardContent>

            <CardFooter>
              <button
                onClick={() => handleUseTemplate(htmlContent.templateId)}
                className="bg-blue-500/20 hover:bg-blue-700/50 text-white font-normal uppercase px-4 rounded-full w-full py-4 drop-shadow-2xl"
              >
                Use This template
              </button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TemplateMailPage;
