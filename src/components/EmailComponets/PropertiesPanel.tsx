"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEmailStore } from "@/Store/emailStore";
import { X } from "lucide-react";

export function PropertiesPanel() {
  const {
    selectedComponent,
    components,
    updateComponent,
    setSelectedComponent,
  } = useEmailStore();

  if (selectedComponent === null) return null;

  const component = components[selectedComponent];

  const handleChange = (key: string, value: string) => {
    updateComponent(selectedComponent, {
      ...component,
      props: {
        ...component.props,
        [key]: value,
      },
    });
  };

  return (
    <Card className="w-80 border-l h-full">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Properties</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedComponent(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          {component.type === "text" && (
            <div className="space-y-2">
              <Label>Content</Label>
              <Input
                value={component.props.content || ""}
                onChange={(e) => handleChange("content", e.target.value)}
              />
            </div>
          )}
          {component.type === "image" && (
            <>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={component.props.src || ""}
                  onChange={(e) => handleChange("src", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input
                  value={component.props.alt || ""}
                  onChange={(e) => handleChange("alt", e.target.value)}
                />
              </div>
            </>
          )}
          {component.type === "button" && (
            <>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={component.props.label || ""}
                  onChange={(e) => handleChange("label", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={component.props.href || ""}
                  onChange={(e) => handleChange("href", e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
