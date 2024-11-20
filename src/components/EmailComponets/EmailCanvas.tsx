"use client";

import { useEmailStore } from "@/Store/emailStore";
import { useDroppable } from "@dnd-kit/core";
import { ScrollArea } from "../ui/scroll-area";
import { EmailComponent } from "./EmailComponets";

export function EmailCanvas() {
  const { components, setSelectedComponent } = useEmailStore();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div
          ref={setNodeRef}
          className="bg-white min-h-[800px] rounded-lg shadow-md p-8"
          onClick={() => setSelectedComponent(null)}
        >
          <ScrollArea className="h-full">
            {components.map((component, index) => (
              <EmailComponent
                key={index}
                component={component}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponent(index);
                }}
              />
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
