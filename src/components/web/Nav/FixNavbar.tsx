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
      className={`fixed left-0 right-0 z-50 mx-auto w-full max-w-[1440px] transition-all duration-200 ease-linear ${
        isScrolled ? "top-0 bg-slate-50 dark:bg-[#060d1d]" : "top-0"
      }`}
    >
      <nav
        className={cn(
          "w-full border-2 border-transparent px-2 transition-all duration-300 2xl:px-10",
          isScrolled
            ? "mx-auto max-w-6xl py-3 shadow-sm backdrop-blur-lg"
            : "mx-auto max-w-full border-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* logo */}
            <Link href={"/"}>
              <div className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                <CircuitBoard
                  className="h-8 w-8 text-blue-400"
                  strokeWidth={1.5}
                />
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-bold uppercase text-transparent">
                  <span className="">Draftex</span>
                </span>
              </div>
            </Link>
            {/* logo */}
            <div className="hidden items-center space-x-8 md:flex">
              {navLink.map((link, index) => {
                return (
                  <Link
                    key={index + 1}
                    href={link.href}
                    className={cn(
                      "relative px-1 py-2 font-medium transition-colors duration-200",
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
                      "after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                      "hover:text-primary hover:after:scale-x-100",
                      `${
                        link.active
                          ? "text-primary after:scale-x-100"
                          : "text-muted-foreground"
                      }`,
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
                <Button className="rounded-full px-6 font-bold uppercase">
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
