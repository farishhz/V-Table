export const getTableRoundedClasses = (tableRounded: string) => {
  switch (tableRounded) {
    case "md":
      return "rounded-md overflow-hidden";
    case "lg":
      return "rounded-lg ";
    case "none":
    default:
      return "";
  }
};

export const getCellRoundedClasses = (
  rowIndex: number,
  colIndex: number,
  totalRows: number,
  totalCols: number,
  tableRounded: string,
) => {
  if (tableRounded === "none") return "";

  const isFirstRow = rowIndex === 0;
  const isLastRow = rowIndex === totalRows - 1;
  const isFirstCol = colIndex === 0;
  const isLastCol = colIndex === totalCols - 1;

  let cornerClasses = "";

  // Top-left corner
  if (isFirstRow && isFirstCol) {
    cornerClasses += ` ${tableRounded === "md" ? "rounded-tl-md" : "rounded-tl-lg"}`;
  }

  // Top-right corner
  if (isFirstRow && isLastCol) {
    cornerClasses += ` ${tableRounded === "md" ? "rounded-tr-md" : "rounded-tr-lg"}`;
  }

  // Bottom-left corner
  if (isLastRow && isFirstCol) {
    cornerClasses += ` ${tableRounded === "md" ? "rounded-bl-md" : "rounded-bl-lg"}`;
  }

  // Bottom-right corner
  if (isLastRow && isLastCol) {
    cornerClasses += ` ${tableRounded === "md" ? "rounded-br-md" : "rounded-br-lg"}`;
  }

  return cornerClasses;
};

export const getBorderClasses = (
  rowIndex: number,
  colIndex: number,
  totalRows: number,
  totalCols: number,
  borderTable: string,
) => {
  const isFirstRow = rowIndex === 0;
  const isLastRow = rowIndex === totalRows - 1;
  const isFirstCol = colIndex === 0;
  const isLastCol = colIndex === totalCols - 1;

  switch (borderTable) {
    case "none":
      return "";

    case "outer":
      let outerClasses = "";
      if (isFirstRow) outerClasses += " border-t";
      if (isLastRow) outerClasses += " border-b";
      if (isFirstCol) outerClasses += " border-l";
      if (isLastCol) outerClasses += " border-r";
      return outerClasses;

    case "inner":
      let innerClasses = "";
      if (!isFirstRow) innerClasses += " border-t";
      if (!isLastRow) innerClasses += " border-b";
      if (!isFirstCol) innerClasses += " border-l";
      if (!isLastCol) innerClasses += " border-r";
      return innerClasses;

    case "horizontal":
      return !isFirstRow ? " border-t" : "";

    case "vertical":
      return !isFirstCol ? " border-l" : "";

    case "horizontal-outer":
      let hOuterClasses = "";
      if (!isFirstRow) hOuterClasses += " border-t";
      if (isFirstCol) hOuterClasses += " border-l";
      if (isLastCol) hOuterClasses += " border-r";
      if (isFirstRow) hOuterClasses += " border-t";
      if (isLastRow) hOuterClasses += " border-b";
      return hOuterClasses;

    case "vertical-outer":
      let vOuterClasses = "";
      if (!isFirstCol) vOuterClasses += " border-l";
      if (isFirstRow) vOuterClasses += " border-t";
      if (isLastRow) vOuterClasses += " border-b";
      if (isFirstCol) vOuterClasses += " border-l";
      if (isLastCol) vOuterClasses += " border-r";
      return vOuterClasses;

    case "all":
    default:
      return " border";
  }
};

export const getHeaderBackgroundColor = (hasHeaderBackground: boolean) => {
  if (!hasHeaderBackground) return "transparent";
  return "rgb(203, 213, 225, 0.3)";
};
