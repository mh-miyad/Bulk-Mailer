"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Component, components } from "@/lib/Template";
import useStore from "@/Store/Store";
import {
  Body,
  Container,
  Button as EmailButton,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Edit, Plus, Redo2, Save, Undo2 } from "lucide-react";
import { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Enhanced sample email components

// Zustand store

export default function EmailTemplateDesigner() {
  const {
    design,
    templates,
    selectedComponent,
    setDesign,
    setSelectedComponent,
    updateComponent,
    addTemplate,
    undo,
    redo,
  } = useStore();
  const [previewMode, setPreviewMode] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const newDesign = Array.from(design);
      const [reorderedItem] = newDesign.splice(result.source.index, 1);
      newDesign.splice(result.destination.index, 0, reorderedItem);
      setDesign(newDesign);
    },
    [design, setDesign]
  );

  const addComponent = useCallback(
    (component: Component) => {
      setDesign([
        ...design,
        { ...component, id: `${component.id}-${Date.now()}` },
      ]);
    },
    [design, setDesign]
  );

  const renderEmailComponent = useCallback((item) => {
    switch (item.type) {
      case "header":
        return <Heading style={item.style}>{item.content}</Heading>;
      case "text":
        return <Text style={item.style}>{item.content}</Text>;
      case "button":
        return <EmailButton style={item.style}>{item.content}</EmailButton>;
      case "image":
        return <Img src={item.src} alt={item.content} style={item.style} />;
      case "divider":
        return <Hr style={item.style} />;
      case "link":
        return (
          <Link href={item.href} style={item.style}>
            {item.content}
          </Link>
        );
      default:
        return null;
    }
  }, []);

  const renderPreview = useCallback(
    () => (
      <Html>
        <Head />
        <Preview>Email Preview</Preview>
        <Body
          style={{
            backgroundColor: "#f6f9fc",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Container>
            <Section>
              {design.map((item) => renderEmailComponent(item))}
            </Section>
          </Container>
        </Body>
      </Html>
    ),
    [design, renderEmailComponent]
  );

  const handleStyleChange = useCallback(
    (property, value) => {
      if (selectedComponent) {
        updateComponent(selectedComponent.id, {
          style: { ...selectedComponent.style, [property]: value },
        });
      }
    },
    [selectedComponent, updateComponent]
  );

  const saveTemplate = useCallback(() => {
    if (editingTemplate) {
      addTemplate({ ...editingTemplate, design: design });
    } else {
      addTemplate({
        id: Date.now(),
        name: `Template ${templates.length + 1}`,
        design: design,
      });
    }
    setEditingTemplate(null);
  }, [addTemplate, design, editingTemplate, templates.length]);

  const editTemplate = useCallback(
    (template) => {
      setDesign(template.design);
      setEditingTemplate(template);
    },
    [setDesign]
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
        {components.map((component) => (
          <div
            key={component.id}
            className="bg-white p-2 mb-2 cursor-move"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", JSON.stringify(component));
            }}
          >
            {component.content}
          </div>
        ))}
        <h2 className="text-lg font-semibold mt-8 mb-4">Templates</h2>
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-2 mb-2 flex justify-between items-center"
          >
            <span>{template.name}</span>
            <Button onClick={() => editTemplate(template)} size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="w-2/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Email Design</h2>
        <div className="mb-4 flex justify-between">
          <div>
            <Button onClick={undo} className="mr-2" aria-label="Undo">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button onClick={redo} className="mr-2" aria-label="Redo">
              <Redo2 className="w-4 h-4" />
            </Button>
            <Button onClick={saveTemplate} className="mr-2">
              {editingTemplate ? (
                <Save className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {editingTemplate ? "Update Template" : "Save as Template"}
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setPreviewMode(!previewMode)}
              className="mr-2"
            >
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
          </div>
        </div>
        {previewMode ? (
          <div>
            <div className="border-2 border-dashed border-gray-300 p-4 min-h-[300px]">
              <button onClick={() => setPreviewMode(!previewMode)}>
                {" "}
                Back To Edit Mood{" "}
              </button>
              {renderPreview()}
            </div>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="email-design">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[300px] border-2 border-dashed border-gray-300 p-4"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const component = JSON.parse(
                      e.dataTransfer.getData("text")
                    );
                    addComponent(component);
                  }}
                >
                  {design.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 cursor-move"
                          onClick={() => setSelectedComponent(item)}
                          style={item.style}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Customize</h2>
        {selectedComponent && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedComponent.type}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  value={selectedComponent.content}
                  onChange={(e) =>
                    updateComponent(selectedComponent.id, {
                      content: e.target.value,
                    })
                  }
                />
              </div>
              {selectedComponent.type === "image" && (
                <div>
                  <Label htmlFor="src">Image Source</Label>
                  <Input
                    id="src"
                    value={selectedComponent.src}
                    onChange={(e) =>
                      updateComponent(selectedComponent.id, {
                        src: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              {selectedComponent.type === "link" && (
                <div>
                  <Label htmlFor="href">Link URL</Label>
                  <Input
                    id="href"
                    value={selectedComponent.href}
                    onChange={(e) =>
                      updateComponent(selectedComponent.id, {
                        href: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <Slider
                  id="fontSize"
                  min={8}
                  max={72}
                  step={1}
                  value={[selectedComponent.style.fontSize]}
                  onValueChange={([value]) =>
                    handleStyleChange("fontSize", value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={selectedComponent.style.color}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                />
              </div>
              {selectedComponent.type === "button" && (
                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={selectedComponent.style.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      handleStyleChange("backgroundColor", e.target.value)
                    }
                  />
                </div>
              )}
              <div>
                <Label htmlFor="textAlign">Text Align</Label>
                <select
                  name="textAlign"
                  id="textAlign"
                  defaultValue={selectedComponent.style.textAlign}
                  value={selectedComponent.style.textAlign}
                  onChange={(e) =>
                    handleStyleChange(
                      "textAlign",
                      e.target.value as "left" | "center" | "right"
                    )
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
