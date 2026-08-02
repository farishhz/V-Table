"use client";

import { useSetAtom } from "jotai";
import { useState } from "react";
import { generateEmptyTable } from "../../util/generate-table";
import { tableDataAtom } from "../../store/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/button";
const MAX_ROWS = 10;
const MAX_COLS = 10;

const BuildTableControl = () => {
  const setTableData = useSetAtom(tableDataAtom);
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });

  const buildTable = (rows: number, cols: number) => {
    const table = generateEmptyTable(rows, cols);
    setTableData(table);
  };

  return (
    <Popover>
      <PopoverTrigger asChild >
        <Button className="border border-[#85A6A5]  py-4 rounded text-sm">Build Table</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-black">
        <div className="grid gap-1 w-full justify-center">
          {[...Array(MAX_ROWS)].map((_, rowIdx) => (
            <div className="flex gap-1 " key={rowIdx}>
              {[...Array(MAX_COLS)].map((_, colIdx) => {
                const active = rowIdx <= hovered.rows && colIdx <= hovered.cols;
                return (
                  <div
                    key={colIdx}
                    className={`w-5 h-5 border cursor-pointer ${active ? "bg-[#85A6A5]" : "bg-white"}`}
                    onMouseEnter={() => setHovered({ rows: rowIdx, cols: colIdx })}
                    onClick={() => buildTable(rowIdx + 1, colIdx + 1)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="text-xs text-center mt-2 text-gray-500">
          {hovered.rows + 1} x {hovered.cols + 1}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BuildTableControl;
