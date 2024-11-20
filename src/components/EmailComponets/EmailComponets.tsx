"use client";

import { Button } from "@/components/ui/button";
import { ComponentType } from "@/Store/emailStore";
import { Container, Img, Section, Text } from "@react-email/components";

interface EmailComponentProps {
  component: ComponentType;
  onClick: (e: React.MouseEvent) => void;
}

export function EmailComponent({ component, onClick }: EmailComponentProps) {
  const renderComponent = () => {
    switch (component.type) {
      case "text":
        return (
          <Text {...component.props}>
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
          />
        );
      case "button":
        return (
          <Button variant="default" {...component.props}>
            {component.props.label || "Click me"}
          </Button>
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
