import React from "react";
import { useAtom } from "jotai";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Button } from "@/components/ui/button";
import ControlContainer from "./ControlContainer";
import { isPadding, paddingAtom, PADDING_OPTIONS } from "../../store/padding";
import useHotkeys from "../../../../../utils/useHotkeys";

const PaddingControl: React.FC = () => {
  const [padding, setPadding] = useAtom(paddingAtom);
  const [isMounted, setIsMounted] = React.useState(false);

  useHotkeys("p", (e) => {
    console.info(e.target);
    const currentIndex = PADDING_OPTIONS.indexOf(padding);
    if (PADDING_OPTIONS[currentIndex + 1]) {
      setPadding(PADDING_OPTIONS[currentIndex + 1]);
    } else {
      setPadding(PADDING_OPTIONS[0]);
    }
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <ControlContainer title="Padding">
        <div className="flex w-full justify-between">
          <div className="h-8 sm:h-10 md:h-12" />
        </div>
      </ControlContainer>
    );
  }

  return (
    <ControlContainer title="Padding">
      {/* Mobile: Grid layout */}
      <div className="flex   sm:hidden gap-2 w-full">
        {PADDING_OPTIONS.map((paddingOption) => (
          <Button
            key={paddingOption}
            variant="outline"
            size="sm"
            onClick={() => setPadding(paddingOption)}
            className={`h-8 border-none rounded-md bg-transparent text-white/40 text-sm font-medium tracking-[0.1px] leading-4 transition-colors duration-200 hover:text-white focus:shadow-[0_0_0_2px_var(--panel-background),0_0_0_4px_rgba(255,255,255,0.1)] focus:outline-none ${
              padding === paddingOption ? "bg-white/10 text-white" : ""
            }`}
            aria-label={`${paddingOption}`}
          >
            {paddingOption}
          </Button>
        ))}
      </div>

      {/* Tablet: Flex with smaller buttons */}
      <div className="hidden sm:flex md:hidden w-full justify-between gap-2">
        {PADDING_OPTIONS.map((paddingOption) => (
          <Button
            key={paddingOption}
            variant="outline"
            size="sm"
            onClick={() => setPadding(paddingOption)}
            className={`flex-1 h-10 border-none rounded-md bg-transparent text-white/40 text-sm font-medium tracking-[0.1px] leading-4 transition-colors duration-200 hover:text-white focus:shadow-[0_0_0_2px_var(--panel-background),0_0_0_4px_rgba(255,255,255,0.1)] focus:outline-none ${
              padding === paddingOption ? "bg-white/10 text-white" : ""
            }`}
            aria-label={`${paddingOption}`}
          >
            {paddingOption}
          </Button>
        ))}
      </div>

      {/* Desktop: Original layout */}
      <div className="hidden md:flex w-full justify-between">
        {PADDING_OPTIONS.map((paddingOption) => (
          <Button
            key={paddingOption}
            variant="outline"
            size="sm"
            onClick={() => setPadding(paddingOption)}
            className={`w-12 h-12 border-none rounded-md bg-transparent text-white/40 text-base font-medium tracking-[0.1px] leading-4 transition-colors duration-200 hover:text-white focus:shadow-[0_0_0_2px_var(--panel-background),0_0_0_4px_rgba(255,255,255,0.1)] focus:outline-none ${
              padding === paddingOption ? "bg-white/10 text-white" : ""
            }`}
            aria-label={`${paddingOption}`}
          >
            {paddingOption}
          </Button>
        ))}
      </div>
    </ControlContainer>
  );
};

export default PaddingControl;
