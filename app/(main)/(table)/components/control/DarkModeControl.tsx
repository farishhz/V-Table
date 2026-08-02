import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { darkModeAtom } from "../../store/themes";
import useHotkeys from "../../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";

const BackgroundControl: React.FC = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const toggleDarkMode = useCallback(() => setDarkMode((old) => !old), [setDarkMode]);

  useHotkeys("d", toggleDarkMode);

  return (
    <>
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 sm:gap-4">
        <p className="text-[#ffffff66] sm:text-white cursor-default text-[10px] sm:text-sm font-medium tracking-[0.1px] leading-[14px] whitespace-nowrap">
          <span className="sm:hidden">Mode</span>
          <span className="hidden sm:inline">Light/Dark Mode</span>
        </p>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} className="scale-75 sm:scale-100" />
      </div>
    </>
  );
};

export default BackgroundControl;
