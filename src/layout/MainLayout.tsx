import { ThemeProvider } from "@/Theme/theme-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-full block h-full ">{children}</div>
    </ThemeProvider>
  );
}
