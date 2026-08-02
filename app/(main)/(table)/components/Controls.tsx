import React from "react";

import BackgroundControl from "./control/BackgroundControl";
import DarkModeControl from "./control/DarkModeControl";
import PaddingControl from "./control/PaddingControl";
import ThemeControl from "./ThemeControl";
import BorderStyleControl from "./control/border-style";
import HeaderBackgroundControl from "./header-background";
import BorderTableControl from "./control/border-table";
import RoundedTableControl from "./rounded-table";
import BuildTableControl from "./control/build-table";
import ImportButton from "./control/import-button";
import { Separator } from "@/components/ui/seperator";
const Controls: React.FC = () => {
  return (
    <div className="hidden md:flex h-full w-[300px]  flex-col bg-[#121A19] gap-8 p-4 overflow-x-hidden ">
      <div className="w-full flex flex-col">
        <BuildTableControl />
      </div>
      <ThemeControl />
      <BackgroundControl />
      <DarkModeControl />

      <HeaderBackgroundControl />
      <BorderStyleControl />
      <BorderTableControl />
      <RoundedTableControl />
      <PaddingControl />
    </div>
  );
};

export default Controls;
