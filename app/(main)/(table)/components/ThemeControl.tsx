"use client";

import { useAtom } from "jotai";
import React from "react";
import { ChevronDown, Palette, ChevronUp } from "lucide-react";
import { themeAtom, THEMES, Theme, unlockedThemesAtom } from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import { motion, useSpring } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ThemeControl: React.FC = () => {
  const [currentTheme, atomSetTheme] = useAtom(themeAtom);
  const [unlockedThemes] = useAtom(unlockedThemesAtom);
  const [expanded, setExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const animatedHeight = useSpring(0, { stiffness: 120, damping: 20 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const setTheme = (theme: Theme) => {
    atomSetTheme(theme);
    try {
      localStorage.setItem("codeTheme", theme.id);
    } catch (error) {
      console.log("Could not set theme in localStorage", error);
    }
  };

  useHotkeys("c", () => {
    const availableThemes = Object.values(THEMES).filter((theme) => unlockedThemes.includes(theme.id) || !theme.hidden);
    const currentIndex = availableThemes.indexOf(currentTheme);
    if (Object.values(availableThemes)[currentIndex + 1]) {
      setTheme(Object.values(availableThemes)[currentIndex + 1]);
    } else {
      setTheme(Object.values(availableThemes)[0]);
    }
  });

  const { themes } = React.useMemo(() => {
    return Object.entries(THEMES).reduce<{ themes: Theme[] }>(
      (acc, [key, value]) => {
        const themeWithKey = { ...value, key };
        if (!value.partner) acc.themes.push(themeWithKey);
        return acc;
      },
      { themes: [] },
    );
  }, []);

  React.useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(expanded ? contentRef.current.offsetHeight : 0);
    }
  }, [expanded, animatedHeight]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="sm:w-full flex flex-col sm:block sm:max-w-sm rounded-xl sm:border border-[#85A6A5] bg-muted gap-2">
      <p className="text-[#ffffff66] sm:hidden flex cursor-default text-[10px] sm:text-sm font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
        Select theme
      </p>
      <div className="block md:hidden">
        <Select
          value={currentTheme.id}
          onValueChange={(value) => {
            const selectedTheme = themes.find((t) => t.id === value);
            if (selectedTheme) setTheme(selectedTheme);
          }}
        >
          <SelectTrigger size="sm" className="border-none p-0 block md:hidden">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent className="bg-[#121A19]">
            {themes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id}>
                <div className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-md inline-block"
                    style={{
                      backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
                    }}
                  />
                  <span>{theme.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden md:block">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full hidden md:flex items-center justify-between px-4 py-3 text-left hover:bg-muted/70 transition"
        >
          <div className="flex items-center gap-3">
            <Palette style={{ width: "24px", height: "24px" }} />
            <span className="font-bold text-xl">Theme</span>
          </div>
          <span>{expanded ? <ChevronUp /> : <ChevronDown />}</span>
        </button>

        {isMounted && (
          <motion.div style={{ height: animatedHeight }} className="overflow-hidden">
            <div ref={contentRef} className="grid grid-cols-3 px-4 pb-4 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme);
                    setExpanded(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/70 transition ${
                    currentTheme.id === theme.id ? "bg-muted" : ""
                  }`}
                >
                  <span
                    className="w-16 h-12 rounded-md"
                    style={{
                      backgroundImage: `linear-gradient(140deg, ${theme.background.from}, ${theme.background.to})`,
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ThemeControl;
