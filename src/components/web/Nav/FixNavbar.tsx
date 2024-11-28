"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CircuitBoard, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
const navLink = [
  {
    label: "Home",
    href: "/",
    active: true,
  },
  {
    label: "About",
    href: "/about",
    active: false,
  },
  {
    label: "Price",
    href: "/price",
    active: false,
  },
];
const FixNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed  left-0 transition-all ease-linear duration-200 right-0 z-50 max-w-[1440px] mx-auto w-full ${
        isScrolled ? "max-w-6xl px-10 top-5" : "top-0"
      }`}
    >
      <nav
        className={cn(
          "w-full transition-all duration-300 border-2 rounded-full px-10",
          isScrolled
            ? "py-3  bg-slate-50 dark:bg-slate-900 backdrop-blur-lg shadow-sm  border-blue-900/30"
            : "py-5 bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* logo */}
            <Link href={"/"}>
              <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <CircuitBoard
                  className="h-8 w-8 text-blue-400"
                  strokeWidth={1.5}
                />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent uppercase">
                  <span className="">Draftex</span>
                </span>
              </div>
            </Link>
            {/* logo */}
            <div className="hidden md:flex items-center space-x-8">
              {navLink.map((link, index) => {
                return (
                  <Link
                    key={index + 1}
                    href={link.href}
                    className={cn(
                      "relative py-2 px-1 font-medium transition-colors duration-200",
                      "after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full",
                      "after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                      "hover:text-primary hover:after:scale-x-100",
                      `${
                        link.active
                          ? "text-primary after:scale-x-100"
                          : "text-muted-foreground"
                      }`
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {/* Login */}
            <div className="flex gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="icon"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={"/login"}>
                <Button className="rounded-full uppercase px-6 font-bold">
                  Login
                </Button>
              </Link>
            </div>
            {/* Login */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default FixNavbar;
