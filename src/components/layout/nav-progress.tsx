"use client";
import React from "react";
import { Progress } from "../ui/progress";
import { weatherStore } from "@/stores/weather-store";
import { Info } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

const NavProgress = () => {
  const { weatherTags } = weatherStore();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(weatherTags.length * 25), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { isMobile, open } = useSidebar();
  return (
    <div>
      <div className="flex gap-1 pb-1  text-muted-foreground">
        <Info className="size-4" />
        <span className="text-xs">
          {open ? (
            <>{weatherTags.length} out of 4 weather tags created</>
          ) : (
            <>{weatherTags.length}/4</>
          )}
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
};

export default NavProgress;
