
export const createTableActions = (tableData: string[][], setTableData: (data: string[][]) => void) => {
  const updateCell = (row: number, col: number, value: string) => {
    const updated = [...tableData];
    updated[row][col] = value;
    setTableData(updated);
  };

  const insertRow = (rowIndex: number, position: "above" | "below") => {
    const newRow = new Array(tableData[0].length).fill("");
    const updated = [...tableData];
    const insertAt = position === "above" ? rowIndex : rowIndex + 1;
    updated.splice(insertAt, 0, newRow);
    setTableData(updated);
  };

  const insertColumn = (colIndex: number, position: "left" | "right") => {
    const updated = tableData.map((row) => {
      const newRow = [...row];
      const insertAt = position === "left" ? colIndex : colIndex + 1;
      newRow.splice(insertAt, 0, "");
      return newRow;
    });
    setTableData(updated);
  };

  const deleteRow = (rowIndex: number) => {
    if (tableData.length <= 1) return;
    const updated = [...tableData];
    updated.splice(rowIndex, 1);
    setTableData(updated);
  };

  const deleteColumn = (colIndex: number) => {
    if (tableData[0].length <= 1) return;
    const updated = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(colIndex, 1);
      return newRow;
    });
    setTableData(updated);
  };

  return {
    updateCell,
    insertRow,
    insertColumn,
    deleteRow,
    deleteColumn,
  };
};
