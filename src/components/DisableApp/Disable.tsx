"use client";
import { ReactNode, useEffect } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    // Disable specific keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" || // Disable F12
        (e.ctrlKey && e.shiftKey && e.key === "I") // Disable Ctrl+Shift+I
      ) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div>{children}</div>;
};

export default ProtectedLayout;
