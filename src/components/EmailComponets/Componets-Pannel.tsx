/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDraggable } from "@dnd-kit/core";
import { Image, Link, List, Mail, Type } from "lucide-react";

const components = [
  { id: "text", icon: Type, label: "Text Block" },
  { id: "image", icon: Image, label: "Image" },
  { id: "button", icon: Mail, label: "Button" },
  { id: "link", icon: Link, label: "Link" },
  { id: "list", icon: List, label: "List" },
];

function DraggableComponent({
  id,
  icon: Icon,
  label,
}: {
  id: string;
  icon: any;
  label: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      suppressHydrationWarning
    >
      <Button variant="outline" className="w-full justify-start gap-2 mb-2">
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}

export function ComponentPanel() {
  return (
    <Card className="w-64 h-full border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Components</h2>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-100px)] pr-4">
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              icon={component.icon}
              label={component.label}
            />
          ))}
        </ScrollArea>
      </div>
    </Card>
  );
}
