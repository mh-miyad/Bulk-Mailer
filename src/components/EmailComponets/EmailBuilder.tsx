"use client";

import { useEmailStore } from "@/Store/emailStore";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { Redo2, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentPanel } from "./Componets-Pannel";
import { EmailCanvas } from "./EmailCanvas";
import { PropertiesPanel } from "./PropertiesPanel";

export default function EmailBuilder() {
  const { addComponent, selectedComponent, undo, redo } = useEmailStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      addComponent({
        type: active.id as string,
        props: {
          style: {
            color: "#000000",
            backgroundColor: "#ffffff",
            fontSize: "16px",
            padding: "16px",
            margin: "0px",
            textAlign: "left",
          },
        },
      });
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Builder</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={undo}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={redo}>
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-1">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <ComponentPanel />
          <EmailCanvas />
          {selectedComponent !== null && <PropertiesPanel />}
        </DndContext>
      </div>
    </div>
  );
}
