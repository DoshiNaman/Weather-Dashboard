"use client";

import { type LucideIcon } from "lucide-react";
import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { ReactNode } from "react";

export function NavMain({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | Icon | undefined;
    isActive?: boolean;
    badge?: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, key) => (
          <SidebarMenuItem key={key}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={pathname === item.url}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              {item.badge && <NavBadge>{item.badge}</NavBadge>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className="text-xs rounded-full px-1 py-0">{children}</Badge>
);
