//@ts-nocheck
"use client";

import * as React from "react";
import {
  IconCloud,
  IconBrowserCheck,
  IconAlertTriangle,
  IconFileText,
  IconHelp,
  IconLayoutDashboard,
  IconChartLine,
  IconShieldCheck,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUserCog,
} from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "./nav-group";
import NavProgress from "./nav-progress";

// This is sample data.
const data = {
  user: {
    name: "naman doshi",
    email: "naman.01798@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "InRisk Labs",
      logo: Command,
      plan: "Climate Insurance Innovation",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: IconLayoutDashboard,
        },
        {
          title: "Weather Forecast",
          url: "/tasks",
          icon: IconCloud,
        },
        {
          title: "Risk Analysis",
          url: "/apps",
          icon: IconAlertTriangle,
        },
        {
          title: "Reports",
          url: "/users",
          icon: IconFileText,
          badge: "2",
        },
        {
          title: "Climate Trends",
          url: "/apps",
          icon: IconChartLine,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: IconUserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: IconTool,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: IconPalette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: IconNotification,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: "Policy Integration",
          url: "/help-center",
          icon: IconShieldCheck,
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: IconHelp,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          title={data.navGroups[0].title}
          items={data.navGroups[0].items}
        />
        <NavGroup
          title={data.navGroups[1].title}
          items={data.navGroups[1].items}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavProgress />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
