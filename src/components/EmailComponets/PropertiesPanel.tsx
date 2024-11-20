"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEmailStore } from "@/Store/emailStore";
import { AlignCenter, AlignLeft, AlignRight, Trash2, X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function PropertiesPanel() {
  const {
    selectedComponent,
    components,
    updateComponent,
    setSelectedComponent,
    deleteComponent,
  } = useEmailStore();

  if (selectedComponent === null) return null;

  const component = components[selectedComponent];

  const handleStyleChange = (key: string, value: string) => {
    updateComponent(selectedComponent, {
      ...component,
      props: {
        ...component.props,
        style: {
          ...component.props.style,
          [key]: value,
        },
      },
    });
  };

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
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteComponent(selectedComponent)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedComponent(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator className="my-4" />

        <div className="space-y-4">
          {/* Content Fields */}
          {component.type === "text" && (
            <div className="space-y-2">
              <Label>Content</Label>
              <Input
                value={component.props.content || ""}
                onChange={(e) => handleChange("content", e.target.value)}
              />
            </div>
          )}

          {/* Style Controls */}
          <div className="space-y-4">
            <Label>Text Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-8"
                  style={{
                    backgroundColor: component.props.style?.color || "#000000",
                  }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <HexColorPicker
                  color={component.props.style?.color || "#000000"}
                  onChange={(color) => handleStyleChange("color", color)}
                />
              </PopoverContent>
            </Popover>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-8"
                    style={{
                      backgroundColor:
                        component.props.style?.backgroundColor || "#ffffff",
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <HexColorPicker
                    color={component.props.style?.backgroundColor || "#ffffff"}
                    onChange={(color) =>
                      handleStyleChange("backgroundColor", color)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select
                value={component.props.style?.fontSize || "16px"}
                onValueChange={(value) => handleStyleChange("fontSize", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["12px", "14px", "16px", "18px", "20px", "24px", "32px"].map(
                    (size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Text Align</Label>
              <div className="flex gap-2">
                <Button
                  variant={
                    component.props.style?.textAlign === "left"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  onClick={() => handleStyleChange("textAlign", "left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    component.props.style?.textAlign === "center"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  onClick={() => handleStyleChange("textAlign", "center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    component.props.style?.textAlign === "right"
                      ? "default"
                      : "outline"
                  }
                  size="icon"
                  onClick={() => handleStyleChange("textAlign", "right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Padding</Label>
              <Input
                type="text"
                placeholder="e.g., 16px"
                value={component.props.style?.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Margin</Label>
              <Input
                type="text"
                placeholder="e.g., 8px"
                value={component.props.style?.margin || ""}
                onChange={(e) => handleStyleChange("margin", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
