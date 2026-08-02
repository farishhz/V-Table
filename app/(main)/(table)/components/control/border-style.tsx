import { useAtom } from "jotai";
import { Square, SquareDashed, Ellipsis } from "lucide-react";
import ControlContainer from "./ControlContainer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isBorderStyle, BORDER_STYLE_OPTIONS, borderStyleAtom } from "../../store/border-style";
import { Button } from "@/components/ui/button";
const BorderStyleControl = () => {
  const [style, setStyle] = useAtom(borderStyleAtom);

  const styleIcons = {
    solid: <Square className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    dashed: <SquareDashed className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
    dotted: <Ellipsis className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  };

  const styleLabels = {
    solid: "Solid",
    dashed: "Dashed",
    dotted: "Dotted",
  };

  return (
    <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4 w-full">
      <p className="text-[#ffffff66] sm:hidden flex cursor-default text-[10px] sm:text-sm font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
        Border style
      </p>

      {/* Mobile: Flex column with smaller buttons */}
      <div className="flex sm:hidden  gap-2 w-full">
        {BORDER_STYLE_OPTIONS.map((borderStyleOption) => (
          <Tooltip key={borderStyleOption}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStyle(borderStyleOption)}
                className={` h-8 rounded-md bg-transparent hover:bg-white/50 text-white hover:text-white border-white/20 flex items-center justify-start gap-2 px-3 ${
                  style === borderStyleOption ? "bg-white/50" : ""
                }`}
              >
                {styleIcons[borderStyleOption]}
                {/* <span className="text-xs">{styleLabels[borderStyleOption]}</span> */}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">{styleLabels[borderStyleOption]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Tablet: Flex row with medium buttons */}
      <div className="hidden sm:flex md:hidden justify-between gap-3 w-full">
        {BORDER_STYLE_OPTIONS.map((borderStyleOption) => (
          <Tooltip key={borderStyleOption}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStyle(borderStyleOption)}
                className={`flex-1 h-10 rounded-md bg-transparent hover:bg-white/50 text-white hover:text-white border-white/20 flex flex-col items-center justify-center gap-1 px-2 ${
                  style === borderStyleOption ? "bg-white/50" : ""
                }`}
              >
                {styleIcons[borderStyleOption]}
                <span className="text-[10px] leading-tight">{styleLabels[borderStyleOption]}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">{styleLabels[borderStyleOption]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Desktop: Original layout with larger buttons */}
      <div className="hidden md:flex justify-between gap-4 lg:gap-6 xl:gap-8 w-full">
        {BORDER_STYLE_OPTIONS.map((borderStyleOption) => (
          <Tooltip key={borderStyleOption}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStyle(borderStyleOption)}
                className={`w-12 h-12 rounded-md bg-transparent hover:bg-white/50 text-white hover:text-white border-white/20 ${
                  style === borderStyleOption ? "bg-white/50" : ""
                }`}
              >
                {styleIcons[borderStyleOption]}
                <span className="sr-only">{styleLabels[borderStyleOption]}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{styleLabels[borderStyleOption]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default BorderStyleControl;
