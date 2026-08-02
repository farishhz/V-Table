"use client";

import { useAtom } from "jotai";
import React from "react";
import { Table2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, useSpring } from "framer-motion";
import HeaderBackgroundControl from "../header-background";
import BorderStyleControl from "./border-style";
import BorderTableControl from "./border-table";
import RoundedTableControl from "../rounded-table";

const BorderControl: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const animatedHeight = useSpring(0, { stiffness: 120, damping: 20 });

  React.useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(expanded ? contentRef.current.offsetHeight : 0);
    }
  }, [expanded, animatedHeight]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      <div className="w-full max-w-sm rounded-xl border border-muted bg-muted  ">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/70 transition"
        >
          <div className="flex items-center gap-3">
            <Table2 style={{ width: "24px", height: "24px" }} />
            <span className="font-bold text-xl">Table</span>
          </div>
          <span>{expanded ? <ChevronUp /> : <ChevronDown />}</span>
        </button>
        {isMounted && (
          <motion.div style={{ height: animatedHeight }} className="overflow-hidden">
            <div ref={contentRef} className="flex flex-col gap-4 px-4  py-4">
              {/* header */}
              <HeaderBackgroundControl />
              {/* border style */}
              <BorderStyleControl />
              {/* border shape */}
              <BorderTableControl />
              {/* border radius */}
              <RoundedTableControl />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default BorderControl;
