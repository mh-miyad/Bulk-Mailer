"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import * as React from "react";
import { ScrollArea } from "./scroll-area";
import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";

// Import the icons you need
import useStore from "@/Store/Store";
import {
  Code,
  FileText,
  Image,
  Layers,
  LayoutGrid,
  Send,
  TestTube,
} from "lucide-react"; // Lucide Icons
import { usePathname } from "next/navigation";
import {
  FaDraftingCompass,
  FaEnvelope,
  FaHome,
  FaUserFriends,
} from "react-icons/fa"; // React Icons
import { SidebarOptInForm } from "./sidebar-comp-opt";
import { SideBarUser } from "./sidebar-user";

// Menu Data
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      icon: FaHome, // Reference the icon's name as a string
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: FaHome,
          isActive: true,
        },
        {
          title: "Projects And Teams",
          url: "#",
          icon: FaUserFriends,
        },
      ],
    },
    {
      title: "Building Your Email",
      url: "#",
      icon: FaEnvelope,
      items: [
        {
          title: "Components",
          url: "/emailComponentsPage",
          icon: LayoutGrid,
        },
        {
          title: "Layouts",
          url: "/layout",
          icon: Layers,
        },
        {
          title: "Templates",
          url: "/Template",
          icon: FileText,
        },
        {
          title: "Email Builder",
          url: "/EmailBuilder",
          icon: FaDraftingCompass,
        },
        {
          title: "Drafts",
          url: "#",
          icon: Code,
        },
        {
          title: "Testing",
          url: "/testing",
          icon: TestTube,
        },
        {
          title: "Examples",
          url: "#",
          icon: FileText,
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      icon: FaEnvelope,
      items: [
        {
          title: "Resend API",
          url: "#",
          icon: Send,
        },
        {
          title: "Nodemailer API",
          url: "#",
          icon: FaEnvelope,
        },
        {
          title: "SendGrid API",
          url: "#",
          icon: Send,
        },
        {
          title: "Image Hosting API",
          url: "#",
          icon: Image,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = usePathname();
  const { setBreadcrumbs } = useStore();
  return (
    <Sidebar {...props} className="bg-white dark:bg-slate-950 dark:text-white">
      <SidebarHeader className="bg-white dark:bg-slate-950">
        <SideBarUser
          user={{
            name: "John Doe",
            email: "G3wL6@example.com",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
        />
        <SearchForm className="my-4" />
      </SidebarHeader>
      <ScrollArea>
        <SidebarContent className="bg-white dark:bg-slate-950">
          {/* We create a SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title} className="mb-2">
              <SidebarGroupLabel>
                {" "}
                <item.icon className="mr-2 h-3 w-3" />
                {item.title}
              </SidebarGroupLabel>
              <SidebarGroupContent className="pl-4 my-3">
                <SidebarMenu>
                  {item.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={() => setBreadcrumbs(item.title)}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive={item.url === router}>
                          <item.icon className="mr-2 h-7 w-7" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

          <div className="p-3">
            <SidebarOptInForm />
            <VersionSwitcher
              versions={data.versions}
              defaultVersion={data.versions[0]}
            />
          </div>
        </SidebarContent>
        <SidebarRail />
      </ScrollArea>
    </Sidebar>
  );
}
