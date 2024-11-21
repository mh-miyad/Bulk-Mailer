"use client";

import { useEmailStore } from "@/Store/emailStore";
import { ComponentType } from "@/Type/Types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

import { Eye, Redo2, Undo2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ComponentPanel } from "./Componets-Pannel";
import { EmailCanvas } from "./EmailCanvas";
import { PropertiesPanel } from "./PropertiesPanel";

export default function EmailBuilder() {
  const { addComponent, selectedComponent, undo, redo } = useEmailStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newComponent: ComponentType = {
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
      };
      addComponent(newComponent);
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
          <Link href="/preview">
            <Button className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
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
