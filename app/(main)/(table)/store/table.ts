import { atom } from "jotai";
import { atomWithHash } from "jotai-location";

export const tableDataAtom = atom<string[][]>([
  ["Invoice", "Status", "Method", "Amount"],
  ["INV001", "Paid", "Credit Card", "$250.00"],
  ["INV002", "Pending", "PayPal", "$150.00"],
  ["INV003", "Unpaid", "Bank Transfer", "$350.00"],
  ["INV004", "Paid", "Credit Card", "$450.00"],
  ["INV005", "Paid", "PayPal", "$550.00"],
]);
  

export const borderStyleAtom = atomWithHash<"solid" | "dashed" | "dotted">("borderStyle", "solid");

export const headerBackgroundAtom = atomWithHash<boolean>("headerBg", true);

export const borderTableAtom = atomWithHash<
  "all" | "none" | "outer" | "inner" | "horizontal" | "vertical" | "horizontal-outer" | "vertical-outer"
>("borderTable", "all");

export const tableRoundedAtom = atomWithHash<"none" | "md" | "lg">("rounded", "none");

export const hoveredCellAtom = atom<{ row: number; col: number } | null>(null);
