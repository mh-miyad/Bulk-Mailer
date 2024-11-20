"use client";

import { useEmailStore } from "@/Store/emailStore";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { ComponentPanel } from "./Componets-Pannel";
import { EmailCanvas } from "./EmailCanvas";
import { PropertiesPanel } from "./PropertiesPanel";

export default function EmailBuilder() {
  const { addComponent, selectedComponent } = useEmailStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      addComponent({
        type: active.id as string,
        props: {},
      });
    }
  };

  return (
    <div className="flex h-screen">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <ComponentPanel />
        <EmailCanvas />
        {selectedComponent && <PropertiesPanel />}
      </DndContext>
    </div>
  );
}
