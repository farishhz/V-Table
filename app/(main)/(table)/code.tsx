"use client";
import { useEffect } from "react";
import { highlighterAtom } from "./store";
import { useAtom } from "jotai";
import { shikiTheme } from "./store/themes";
import Frame from "./components/Frame";
import Controls from "./components/Controls";
import FrameContextStore from "./store/FrameContextStore";
import NoSSR from "./components/NoSSR";
import { Highlighter, getHighlighterCore } from "shiki";
import tailwindLight from "./assets/tailwind/light.json";
import tailwindDark from "./assets/tailwind/dark.json";
import ExportButton from "./components/ExportButton";
import { NavigationActions } from "@/components/navigation";
import { InfoDialog } from "./components/InfoDialog";
import MobileControls from "./components/mobile-control";
export function Code() {
  const [highlighter, setHighlighter] = useAtom(highlighterAtom);

  useEffect(() => {
    getHighlighterCore({
      themes: [shikiTheme, tailwindLight, tailwindDark],
    }).then((highlighter) => {
      setHighlighter(highlighter as Highlighter);
    });
  }, []);
  return (
    <>
      <FrameContextStore>
        <NavigationActions>
          <InfoDialog />
          <ExportButton />
        </NavigationActions>
        <div className="flex h-[calc(100vh-50px)] relative">
          {/* Main Content Grid */}
          <div className="w-full h-full md:pb-0 pb-20">
            <div
              className="grid w-full h-full place-items-center grid-cols-1 grid-rows-[15px_auto_110px] isolate"
              style={{
                gridTemplateAreas: `
                "top"
                "content"
                "footer"
              `,
              }}
            >
              <NoSSR>{highlighter && <Frame />}</NoSSR>
            </div>
          </div>

          {/* Controls - Desktop/Mobile */}
          <div className="hidden md:block">
            <Controls />
          </div>
          <div className="md:hidden">
            <MobileControls />
          </div>
        </div>
      </FrameContextStore>
    </>
  );
}
