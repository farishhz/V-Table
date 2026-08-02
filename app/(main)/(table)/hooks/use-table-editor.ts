import { useAtom } from "jotai";
import {
  tableDataAtom,
  hoveredCellAtom,
  borderStyleAtom,
  headerBackgroundAtom,
  borderTableAtom,
  tableRoundedAtom,
} from "../store/table";
import { themeAtom } from "../store/themes";
import { createTableActions } from "../lib/action";

export const useTableEditor = () => {
  const [tableData, setTableData] = useAtom(tableDataAtom);
  const [hoveredCell, setHoveredCell] = useAtom(hoveredCellAtom);
  const [theme] = useAtom(themeAtom);
  const [borderStyle] = useAtom(borderStyleAtom);
  const [borderTable] = useAtom(borderTableAtom);
  const [tableRounded] = useAtom(tableRoundedAtom);
  const [hasHeaderBackground] = useAtom(headerBackgroundAtom);

  const borderColor = theme.border ?? "rgb(203, 213, 225, 0.3)";
  const tableActions = createTableActions(tableData, setTableData);

  return {
    // State
    tableData,
    hoveredCell,
    setHoveredCell,
    theme,
    borderStyle,
    borderTable,
    tableRounded,
    hasHeaderBackground,
    borderColor,
    // Actions
    ...tableActions,
  };
};
