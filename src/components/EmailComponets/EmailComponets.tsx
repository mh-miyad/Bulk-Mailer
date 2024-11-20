"use client";

import { Button } from "@/components/ui/button";
import { ComponentType } from "@/Type/Types";

import { Container, Hr, Img, Section, Text } from "@react-email/components";

interface EmailComponentProps {
  component: ComponentType;
  onClick: (e: React.MouseEvent) => void;
}

export function EmailComponent({ component, onClick }: EmailComponentProps) {
  const renderComponent = () => {
    const style = component.props.style || {};

    switch (component.type) {
      case "heading":
        return (
          <Text style={{ ...style, fontSize: "24px", fontWeight: "bold" }}>
            {component.props.content || "Heading"}
          </Text>
        );
      case "text":
        return (
          <Text style={style}>
            {component.props.content || "Double click to edit text"}
          </Text>
        );
      case "image":
        return (
          <Img
            src={component.props.src || "https://via.placeholder.com/600x200"}
            alt={component.props.alt || "Image"}
            width={600}
            height={200}
            style={style}
          />
        );
      case "button":
        return (
          <Button style={style}>{component.props.label || "Click me"}</Button>
        );
      case "divider":
        return <Hr style={style} />;
      case "spacer":
        return <div style={{ height: "32px", ...style }} />;
      case "columns":
        return (
          <div style={{ display: "flex", gap: "16px", ...style }}>
            <div style={{ flex: 1 }}>Column 1</div>
            <div style={{ flex: 1 }}>Column 2</div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <Section className="relative group" onClick={onClick}>
      <Container className="hover:outline-dashed hover:outline-2 hover:outline-blue-500 p-2">
        {renderComponent()}
      </Container>
    </Section>
  );
}
