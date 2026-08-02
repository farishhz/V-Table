"use client";
import React from "react";
import TableAction from "./table-action";
import { cn } from "@/utils/cn";
import { useAtomValue } from "jotai";
import { useTableEditor } from "../hooks/use-table-editor";
import {
  getTableRoundedClasses,
  getCellRoundedClasses,
  getBorderClasses,
  getHeaderBackgroundColor,
} from "../lib/utils";
import { darkModeAtom } from "../store/themes";
import styles from "./Frame.module.css";

const TableEditor: React.FC = () => {
  const {
    tableData,
    hoveredCell,
    setHoveredCell,
    borderStyle,
    borderTable,
    tableRounded,
    hasHeaderBackground,
    borderColor,
    updateCell,
    insertRow,
    insertColumn,
    deleteRow,
    deleteColumn,
  } = useTableEditor();
  const darkMode = useAtomValue(darkModeAtom);

  const [resizingCol, setResizingCol] = React.useState<number | null>(null);
  const [colWidth, setColWidth] = React.useState<number>(0);

  const initResize = (e: React.MouseEvent, colIndex: number) => {
    const startX = e.clientX;
    const th = e.currentTarget.parentElement as HTMLElement;
    const startWidth = th.offsetWidth;

    setResizingCol(colIndex);
    setColWidth(startWidth);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(60, startWidth + deltaX);

      th.style.width = `${newWidth}px`;
      setColWidth(newWidth);
    };

    const onMouseUp = () => {
      setResizingCol(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={cn("w-full max-w-[95vw] sm:max-w-[90vw] mx-auto p-2 ", darkMode && "darkMode")}>
      <div className="overflow-x-auto overflow-y-auto max-h-[80vh] sm:max-h-none">
        <table
          className={cn(
            `min-w-full w-max sm:w-full border-separate border-spacing-0 ${getTableRoundedClasses(tableRounded)}`,
          )}
        >
          <tbody>
            {tableData.map((row, rowIndex) => {
              const isHeader = rowIndex === 0 && tableData.length > 1;
              const CellTag = isHeader ? "th" : "td";
              return (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => {
                    const borderClasses = getBorderClasses(
                      rowIndex,
                      colIndex,
                      tableData.length,
                      row.length,
                      borderTable,
                    );

                    const cellRoundedClasses = getCellRoundedClasses(
                      rowIndex,
                      colIndex,
                      tableData.length,
                      row.length,
                      tableRounded,
                    );
                    const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;

                    return (
                      <CellTag
                        key={colIndex}
                        className={cn(
                          `py-1 sm:py-2 z-50 px-0.5 sm:px-1 relative group text-left text-xs sm:text-sm lg:text-base ${isHeader ? "font-semibold" : ""} ${borderClasses} ${cellRoundedClasses}`,
                          styles.darkMode,
                        )}
                        style={{
                          borderColor,
                          borderStyle,
                          backgroundColor: isHeader ? getHeaderBackgroundColor(hasHeaderBackground) : "transparent",
                          minWidth: "80px",
                        }}
                        onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {/* Cell content */}
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateCell(rowIndex, colIndex, e.currentTarget.innerText)}
                          className="w-full border-none outline-none px-2 sm:px-4 py-0.5 sm:py-1 break-words whitespace-pre-wrap min-h-[1.2rem] sm:min-h-[1.5rem] leading-tight sm:leading-relaxed"
                          style={{ wordBreak: "break-word", overflowWrap: "break-word", hyphens: "auto" }}
                        >
                          {cell}
                        </div>
                        {isHeader && (
                          <div
                            onMouseDown={(e) => initResize(e, colIndex)}
                            className="absolute top-0 right-0 w-1 h-full cursor-col-resize z-50"
                          />
                        )}
                        <div
                          className={`absolute right-0.5 sm:right-1 top-0.5 sm:top-1 z-[9999] transition-opacity duration-200 ${
                            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                          onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                        >
                          <TableAction
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            insertRow={insertRow}
                            insertColumn={insertColumn}
                            deleteRow={deleteRow}
                            deleteColumn={deleteColumn}
                          />
                        </div>
                      </CellTag>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEditor;
