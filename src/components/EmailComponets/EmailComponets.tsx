"use client";

import { ComponentType } from "@/Type/Types";
import {
  Column,
  Button as EmailButton,
  Link as EmailLink,
  Heading,
  Hr,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface EmailComponentProps {
  component: ComponentType;
  onClick?: (e: React.MouseEvent) => void;
  preview?: boolean;
}

export function EmailComponent({
  component,
  onClick,
  preview,
}: EmailComponentProps) {
  const renderComponent = () => {
    const style = component.props.style || {};

    switch (component.type) {
      case "heading":
        return (
          <Heading style={{ ...style, margin: style.margin || "0" }}>
            {component.props.content || "Heading"}
          </Heading>
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
      case "image with link":
        return (
          <EmailLink href={component.props.href || "#"} style={style}>
            <Img
              src={component.props.src || "https://via.placeholder.com/600x200"}
              alt={component.props.alt || "Image"}
              width={600}
              height={200}
              style={style}
            />
          </EmailLink>
        );
      case "button":
        return (
          <EmailButton
            href={component.props.href || "#"}
            style={{
              ...style,
              color: style.color || "#ffffff",
              backgroundColor: style.backgroundColor || "#000000",
              padding: style.padding || "12px 20px",
              borderRadius: style.borderRadius || "4px",
              textDecoration: "none",
              textAlign: style.textAlign || "center",
              display: "inline-block",
            }}
          >
            {component.props.content || "Click me"}
          </EmailButton>
        );
      case "link":
        return (
          <EmailLink href={component.props.href || "#"} style={style}>
            {component.props.content || "Click here"}
          </EmailLink>
        );
      case "divider":
        return <Hr style={{ ...style, margin: style.margin || "16px 0" }} />;
      case "spacer":
        return (
          <div style={{ height: component.props.height || "32px", ...style }} />
        );
      case "columns":
        return (
          <Row style={{ ...style, width: "100%" }}>
            <Column style={{ padding: "10px", width: "50%" }}>
              <Text style={{ margin: "0" }}>
                {component.props.leftContent || "Left Column"}
              </Text>
            </Column>
            <Column style={{ padding: "10px", width: "50%" }}>
              <Text style={{ margin: "0" }}>
                {component.props.rightContent || "Right Column"}
              </Text>
            </Column>
          </Row>
        );
      case "list":
        const items = component.props.items || ["Item 1", "Item 2", "Item 3"];
        return (
          <div
            style={{
              ...style,
              listStyleType: style.listStyleType || "disc",
            }}
          >
            <ul
              style={{
                paddingLeft: "20px",
                margin: style.margin || "0",
                lineHeight: style.lineHeight || "1.5",
              }}
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    color: style.color,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      case "table":
        const tableData = component.props.tableData || {
          headers: ["Header 1", "Header 2", "Header 3"],
          rows: [
            ["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3"],
            ["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3"],
          ],
        };
        return (
          <table
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: style.margin || "0 auto",
              borderCollapse: "collapse",
              ...style,
            }}
          >
            <thead>
              <tr>
                {tableData.headers.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      backgroundColor: style.backgroundColor || "#f3f4f6",
                      padding: style.padding || "12px",
                      borderWidth: style.borderWidth || "1px",
                      borderStyle: style.borderStyle || "solid",
                      borderColor: style.borderColor || "#e5e7eb",
                      color: style.color || "#000000",
                      fontSize: style.fontSize,
                      fontWeight: style.fontWeight || "bold",
                      textAlign: style.textAlign || "left",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{
                        padding: style.padding || "12px",
                        borderWidth: style.borderWidth || "1px",
                        borderStyle: style.borderStyle || "solid",
                        borderColor: style.borderColor || "#e5e7eb",
                        color: style.color,
                        fontSize: style.fontSize,
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  if (preview) {
    return (
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        {renderComponent()}
      </div>
    );
  }

  return (
    <Section className="relative group" onClick={onClick}>
      <div className="hover:outline-dashed hover:outline-2 hover:outline-blue-500 p-2">
        {renderComponent()}
      </div>
    </Section>
  );
}
