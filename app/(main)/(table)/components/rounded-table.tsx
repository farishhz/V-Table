import { useAtom } from "jotai";
import { tableRoundedAtom } from "../store/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const RoundedTableControl = () => {
  const [tableRounded, setTableRounded] = useAtom(tableRoundedAtom);
  const [isMounted, setIsMounted] = React.useState(false);

  const roundedOptions = [
    { value: "none", label: "No Rounded", shortLabel: "None" },
    { value: "md", label: "Rounded MD (4px)", shortLabel: "MD (4px)" },
    { value: "lg", label: "Rounded LG (8px)", shortLabel: "LG (8px)" },
  ];

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-2 sm:gap-3 w-full">
        <div className="h-4 sm:h-5" />
        <div className="h-8 sm:h-10 rounded border border-[#85A6A5]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
      {/* Label - Responsive text size and spacing */}
      <p className="text-[#ffffff66] sm:text-white cursor-default text-[10px] sm:text-sm font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
        Table Corner
      </p>

      {/* Mobile Layout - Compact Select */}
      <div className="block sm:hidden">
        <Select value={tableRounded} onValueChange={(value) => setTableRounded(value as typeof tableRounded)}>
          <SelectTrigger className="w-full h-8 border-[#85A6A5] bg-transparent text-white text-xs px-2">
            <SelectValue placeholder="Select corner" />
          </SelectTrigger>
          <SelectContent className="bg-[#131a19] border-[#85A6A5] max-h-32">
            {roundedOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-xs py-2 focus:bg-white/10 hover:bg-white/5"
              >
                {option.shortLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tablet Layout - Medium Select */}
      <div className="hidden sm:block md:hidden">
        <Select value={tableRounded} onValueChange={(value) => setTableRounded(value as typeof tableRounded)}>
          <SelectTrigger className="w-full h-9 border-[#85A6A5] bg-transparent text-white text-sm px-3">
            <SelectValue placeholder="Select corner style" />
          </SelectTrigger>
          <SelectContent className="bg-[#131a19] border-[#85A6A5] max-h-40">
            {roundedOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-sm py-2 focus:bg-white/10 hover:bg-white/5"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Layout - Full Select with Group */}
      <div className="hidden md:block">
        <Select value={tableRounded} onValueChange={(value) => setTableRounded(value as typeof tableRounded)}>
          <SelectTrigger className="w-full h-10 border-[#85A6A5] bg-transparent text-white text-sm px-4">
            <SelectValue placeholder="Select corner style" />
          </SelectTrigger>
          <SelectContent className="bg-[#131a19] border-[#85A6A5] max-h-48">
            <SelectGroup>
              <SelectLabel className="text-white/70 text-xs font-medium px-2 py-1">Corner Options</SelectLabel>
              {roundedOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-sm py-2.5 focus:bg-white/10 hover:bg-white/5 cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RoundedTableControl;
