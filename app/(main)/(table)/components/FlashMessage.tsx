import React, { useEffect, useRef, useState, useMemo } from "react";
import { useAtom } from "jotai";
import { CSSTransition } from "react-transition-group";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import useAudio from "../util/useAudio";


const FlashMessage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flashMessage] = useAtom(derivedFlashMessageAtom);
  const [flashShown] = useAtom(flashShownAtom);

  const [playing, toggle] = useAudio("unlock.mp3");
  useEffect(() => {
    if (flashMessage?.variant === "unlock" && flashShown) {
      toggle();
    }
  }, [flashMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CSSTransition
      in={flashShown}
      nodeRef={containerRef}
      timeout={500}
      classNames={{
        enter: "opacity-0",
        enterActive: "opacity-100 transition-opacity duration-500",
        exit: "opacity-100",
        exitActive: "opacity-0 transition-opacity duration-500",
      }}
      unmountOnExit
    >
      {flashMessage?.variant === "unlock" ? (
        <div
          className="absolute z-[3] flex flex-col items-center justify-center bg-[rgba(13,13,13,0.9)] gap-5 inset-0"
          ref={containerRef}
        >
          <div className="relative w-[88px] h-[88px] animate-[flip_1500ms_cubic-bezier(0,0,0.25,1)] preserve-3d">
            <div className="absolute flex w-full h-full items-center justify-center rounded-full backface-hidden bg-white">
              {flashMessage?.icon}
            </div>
            <div className="absolute flex w-full h-full items-center justify-center rounded-full backface-hidden bg-white rotate-y-180">
              {flashMessage?.icon}
            </div>
          </div>
          <span className="flex h-9 items-center px-4 py-2.5 rounded-full animate-[fadeSlideIn_500ms_200ms_cubic-bezier(0.4,0,0.22,0.96)_forwards] text-sm gap-2 opacity-0">
            {flashMessage?.message}
          </span>
        </div>
      ) : (
        <div
          className="absolute z-10 flex items-center justify-center bg-[rgba(13,13,13,0.9)] inset-0"
          ref={containerRef}
        >
          <span className="flex h-9 items-center px-4 py-2.5 rounded-full backdrop-blur-2xl bg-[#2b2b2b] text-sm gap-2">
            {flashMessage?.icon}
            {flashMessage?.message}
          </span>
        </div>
      )}
    </CSSTransition>
  );
};

export default FlashMessage;
