import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BellDotIcon } from "lucide-react";
import React from "react";

const DashboardHeader = () => {
  return (
    <header
      className={cn(
        "flex items-center gap-3 sm:gap-4 bg-background p-4 h-16 group",
        "shadow-none"
      )}
    >
      <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-2xl">Dashboard</h1>

      <div className="ml-auto flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="scale-95 rounded-full relative"
        >
          <BellDotIcon className="size-[1.2rem] scale-90 " />
          <Badge className="absolute text-xs rounded-full px-1 py-0 top-0 right-0">
            2
          </Badge>
        </Button>
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
