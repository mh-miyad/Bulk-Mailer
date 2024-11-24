/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDraggable } from "@dnd-kit/core";
import {
  Columns,
  Grid,
  Heading,
  Image,
  Link,
  List,
  Mail,
  Table2,
  Type,
} from "lucide-react";

const components = [
  { id: "heading", icon: Heading, label: "Heading" },
  { id: "text", icon: Type, label: "Text Block" },
  { id: "image", icon: Image, label: "Image" },
  { id: "image_with_link", icon: Image, label: "Image With Link" },
  { id: "button", icon: Mail, label: "Button" },
  { id: "link", icon: Link, label: "Link" },
  { id: "list", icon: List, label: "List" },
  { id: "divider", icon: Separator, label: "Divider" },
  { id: "spacer", icon: Grid, label: "Spacer" },
  { id: "columns", icon: Columns, label: "2 Columns" },
  { id: "table", icon: Table2, label: "Table" },
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
    <Card className="w-80 p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {components.map((component) => (
            <DraggableComponent
              key={component.id}
              id={component.id}
              icon={component.icon}
              label={component.label}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
