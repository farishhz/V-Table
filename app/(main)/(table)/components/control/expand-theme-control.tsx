"use client";
import { useAtom } from "jotai";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { themeAtom, THEMES, Theme, unlockedThemesAtom } from "../../store/themes";

export function ExpandableThemeSelect({ value, onChange }: { value: Theme; onChange: (theme: Theme) => void }) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentTheme, atomSetTheme] = useAtom(themeAtom);
  const [unlockedThemes, setUnlockedThemes] = useAtom(unlockedThemesAtom);
  const animatedHeight = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(expanded ? contentRef.current.offsetHeight : 0);
    }
  }, [expanded, animatedHeight]);

  const setTheme = (theme: Theme) => {
    atomSetTheme(theme);
    try {
      localStorage.setItem("codeTheme", theme.id);
    } catch (error) {
      console.log("Could not set theme in localStorage", error);
    }
  };

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

  return (
    <div className="w-full max-w-sm">
      <Button variant="outline" onClick={() => setExpanded((prev) => !prev)} className="w-full justify-between">
        <span>{value.name}</span>
        <span className="ml-2">{expanded ? "▲" : "▼"}</span>
      </Button>

      <motion.div
        style={{ height: animatedHeight }}
        className="overflow-hidden mt-2 rounded-lg border border-muted bg-muted"
      >
        <div ref={contentRef}>
          {Object.values(THEMES).map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onChange(theme);
                setExpanded(false);
              }}
              className="flex items-center gap-2 px-4 py-3 w-full hover:bg-muted/60 transition text-left"
            >
              <span
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.background.from}, ${theme.background.to})`,
                }}
              />
              {theme.name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
