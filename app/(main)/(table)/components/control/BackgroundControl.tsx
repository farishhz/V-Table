import { useAtom } from "jotai";
import React from "react";
import { showBackgroundAtom } from "../../store";
import useHotkeys from "../../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";

const BackgroundControl: React.FC = () => {
  const [showBackground, setShowBackground] = useAtom(showBackgroundAtom);

  useHotkeys("b", () => {
    setShowBackground((old) => !old);
  });

  return (
    <>
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 sm:gap-4">
        <p className="text-[#ffffff66] sm:text-white cursor-default text-[10px] sm:text-sm font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
          Background
        </p>
        <Switch checked={showBackground} onCheckedChange={setShowBackground} className="scale-75 sm:scale-100" />
      </div>
    </>
  );
};

export default BackgroundControl;
