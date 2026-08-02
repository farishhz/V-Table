import { Button } from "@/components/ui/button";
import { Plus, Trash, EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface TableActionProps {
  rowIndex: number;
  colIndex: number;
  insertRow: (rowIndex: number, position: "above" | "below") => void;
  insertColumn: (colIndex: number, position: "left" | "right") => void;
  deleteRow: (rowIndex: number) => void;
  deleteColumn: (colIndex: number) => void;
}

export default function TableAction({
  rowIndex,
  colIndex,
  insertRow,
  insertColumn,
  deleteRow,
  deleteColumn,
}: TableActionProps) {
  const [open, setOpen] = useState(false);

  const handleAction = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
          <EllipsisVertical className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 sm:w-56 md:w-64 p-1 sm:p-2 bg-black" align="start" side="bottom" sideOffset={5}>
        <div className="space-y-0.5 sm:space-y-1">
          <div className="px-2 py-1.5 text-sm font-semibold">Actions</div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8"
            onClick={() => handleAction(() => insertRow(rowIndex, "above"))}
          >
            <Plus className="mr-2 h-4 w-4" /> Insert Row Above
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8"
            onClick={() => handleAction(() => insertRow(rowIndex, "below"))}
          >
            <Plus className="mr-2 h-4 w-4" /> Insert Row Below
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8"
            onClick={() => handleAction(() => insertColumn(colIndex, "left"))}
          >
            <Plus className="mr-2 h-4 w-4" /> Insert Column Left
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8"
            onClick={() => handleAction(() => insertColumn(colIndex, "right"))}
          >
            <Plus className="mr-2 h-4 w-4" /> Insert Column Right
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleAction(() => deleteRow(rowIndex))}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete Row
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleAction(() => deleteColumn(colIndex))}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete Column
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
