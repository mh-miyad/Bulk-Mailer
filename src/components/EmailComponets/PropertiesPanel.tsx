/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmailStore } from "@/Store/emailStore";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";

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

  const handleChange = (key: string, value: any) => {
    updateComponent(selectedComponent, {
      ...component,
      props: {
        ...component.props,
        [key]: value,
      },
    });
  };

  const handleListItemChange = (index: number, value: string) => {
    const items = [...(component.props.items || [""])];
    items[index] = value;
    handleChange("items", items);
  };

  const addListItem = () => {
    const items = [...(component.props.items || []), "New Item"];
    handleChange("items", items);
  };

  const removeListItem = (index: number) => {
    const items = component.props.items?.filter((_, i) => i !== index) || [];
    handleChange("items", items);
  };

  const handleTableChange = (
    type: "header" | "cell",
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const tableData = { ...component.props.tableData };

    if (type === "header") {
      tableData.headers = [...(tableData.headers || [])];
      tableData.headers[cellIndex] = value;
    } else {
      tableData.rows = [...(tableData.rows || [])];
      tableData.rows[rowIndex] = [...tableData.rows[rowIndex]];
      tableData.rows[rowIndex][cellIndex] = value;
    }

    handleChange("tableData", tableData);
  };
  const addTableRow = () => {
    const tableData = component?.props?.tableData ?? {
      headers: ["Header 1", "Header 2", "Header 3"],
      rows: [],
    };
    const newRow = Array(tableData.headers.length).fill("New Cell");
    tableData.rows = [...(tableData.rows || []), newRow];
    handleChange("tableData", tableData);
  };

  const removeTableRow = (index: number) => {
    const tableData = { ...component.props.tableData };
    tableData.rows = (tableData?.rows ?? []).filter((_, i) => i !== index);
    handleChange("tableData", tableData);
  };

  return (
    <Card className="w-80 border-l h-full overflow-y-auto">
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

        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            {/* Content Fields */}
            {(component.type === "text" ||
              component.type === "heading" ||
              component.type === "button" ||
              component.type === "link") && (
              <div className="space-y-2">
                <Label>Content</Label>
                <Input
                  value={component.props.content || ""}
                  onChange={(e) => handleChange("content", e.target.value)}
                />
              </div>
            )}

            {(component.type === "button" || component.type === "link") && (
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={component.props.href || ""}
                  onChange={(e) => handleChange("href", e.target.value)}
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

            {component.type === "columns" && (
              <>
                <div className="space-y-2">
                  <Label>Left Column</Label>
                  <Input
                    value={component.props.leftContent || ""}
                    onChange={(e) =>
                      handleChange("leftContent", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Right Column</Label>
                  <Input
                    value={component.props.rightContent || ""}
                    onChange={(e) =>
                      handleChange("rightContent", e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {component.type === "list" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>List Items</Label>
                  <Button variant="outline" size="icon" onClick={addListItem}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {(component.props.items || []).map(
                  (item: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) =>
                          handleListItemChange(index, e.target.value)
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeListItem(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                )}
              </div>
            )}

            {component.type === "table" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Headers</Label>
                  <div className="flex gap-2 flex-wrap">
                    {(component.props.tableData?.headers || []).map(
                      (header, index) => (
                        <Input
                          key={index}
                          className="flex-1"
                          value={header}
                          onChange={(e) =>
                            handleTableChange(
                              "header",
                              0,
                              index,
                              e.target.value
                            )
                          }
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Rows</Label>
                    <Button variant="outline" size="icon" onClick={addTableRow}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(component.props.tableData?.rows || []).map(
                    (row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-2 items-center">
                        <div className="flex gap-2 flex-1">
                          {row.map((cell, cellIndex) => (
                            <Input
                              key={cellIndex}
                              className="flex-1"
                              value={cell}
                              onChange={(e) =>
                                handleTableChange(
                                  "cell",
                                  rowIndex,
                                  cellIndex,
                                  e.target.value
                                )
                              }
                            />
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeTableRow(rowIndex)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-8"
                      style={{
                        backgroundColor:
                          component.props.style?.color || "#000000",
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
              </div>

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
                      color={
                        component.props.style?.backgroundColor || "#ffffff"
                      }
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
                  onValueChange={(value) =>
                    handleStyleChange("fontSize", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "12px",
                      "14px",
                      "16px",
                      "18px",
                      "20px",
                      "24px",
                      "32px",
                      "48px",
                    ].map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Font Weight</Label>
                <Select
                  value={component.props.style?.fontWeight || "normal"}
                  onValueChange={(value) =>
                    handleStyleChange("fontWeight", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["normal", "bold", "lighter", "bolder"].map((weight) => (
                      <SelectItem key={weight} value={weight}>
                        {weight}
                      </SelectItem>
                    ))}
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

              {component.type === "list" && (
                <div className="space-y-2">
                  <Label>List Style Type</Label>
                  <Select
                    value={component.props.style?.listStyleType || "disc"}
                    onValueChange={(value) =>
                      handleStyleChange("listStyleType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "disc",
                        "circle",
                        "square",
                        "decimal",
                        "decimal-leading-zero",
                        "lower-alpha",
                        "upper-alpha",
                        "lower-roman",
                        "upper-roman",
                      ].map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(component.type === "table" || component.type === "button") && (
                <>
                  <div className="space-y-2">
                    <Label>Border Width</Label>
                    <Select
                      value={component.props.style?.borderWidth || "1px"}
                      onValueChange={(value) =>
                        handleStyleChange("borderWidth", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["0px", "1px", "2px", "4px", "8px"].map((width) => (
                          <SelectItem key={width} value={width}>
                            {width}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Border Style</Label>
                    <Select
                      value={component.props.style?.borderStyle || "solid"}
                      onValueChange={(value) =>
                        handleStyleChange("borderStyle", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["none", "solid", "dashed", "dotted", "double"].map(
                          (style) => (
                            <SelectItem key={style} value={style}>
                              {style}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Border Color</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-8"
                          style={{
                            backgroundColor:
                              component.props.style?.borderColor || "#e5e7eb",
                          }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <HexColorPicker
                          color={
                            component.props.style?.borderColor || "#e5e7eb"
                          }
                          onChange={(color) =>
                            handleStyleChange("borderColor", color)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}

              {component.type === "button" && (
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <Select
                    value={component.props.style?.borderRadius || "4px"}
                    onValueChange={(value) =>
                      handleStyleChange("borderRadius", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["0px", "2px", "4px", "8px", "16px", "9999px"].map(
                        (radius) => (
                          <SelectItem key={radius} value={radius}>
                            {radius}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Letter Spacing</Label>
                <Select
                  value={component.props.style?.letterSpacing || "normal"}
                  onValueChange={(value) =>
                    handleStyleChange("letterSpacing", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["normal", "-0.05em", "0.05em", "0.1em"].map((spacing) => (
                      <SelectItem key={spacing} value={spacing}>
                        {spacing}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Line Height</Label>
                <Select
                  value={component.props.style?.lineHeight || "1.5"}
                  onValueChange={(value) =>
                    handleStyleChange("lineHeight", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "1.25", "1.5", "1.75", "2"].map((height) => (
                      <SelectItem key={height} value={height}>
                        {height}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Text Decoration</Label>
                <Select
                  value={component.props.style?.textDecoration || "none"}
                  onValueChange={(value) =>
                    handleStyleChange("textDecoration", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["none", "underline", "line-through", "overline"].map(
                      (decoration) => (
                        <SelectItem key={decoration} value={decoration}>
                          {decoration}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
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

              {component.type === "spacer" && (
                <div className="space-y-2">
                  <Label>Height</Label>
                  <Input
                    type="text"
                    placeholder="e.g., 32px"
                    value={component.props.height || "32px"}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
