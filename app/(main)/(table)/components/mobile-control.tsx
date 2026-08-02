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

const MobileControls: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121A19] border-t border-gray-700">
      {/* Scrollable horizontal container */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="flex gap-6 p-6 min-w-max">
          {/* Compact controls dalam bentuk horizontal */}
          <div className="flex-shrink-0 ">
            <ThemeControl />
          </div>
          <div className="flex-shrink-0 ">
            <BackgroundControl />
          </div>
          <div className="flex-shrink-0">
            <DarkModeControl />
          </div>
          <div className="flex-shrink-  0">
            <HeaderBackgroundControl />
          </div>
          <div className="flex-shrink-0">
            <BorderStyleControl />
          </div>
          <div className="flex-shrink-0">
            <BorderTableControl />
          </div>
          <div className="flex-shrink-0">
            <RoundedTableControl />
          </div>
          <div className="flex-shrink-0">
            <PaddingControl />
          </div>
        </div>
      </div>

      {/* Optional: Scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <div className="h-full bg-blue-500 w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default MobileControls;
