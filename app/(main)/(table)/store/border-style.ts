import { atomWithHash } from "jotai-location";

export const BORDER_STYLE_OPTIONS = ["solid", "dashed", "dotted"] as const;

export type BorderStyle = (typeof BORDER_STYLE_OPTIONS)[number];

export function isBorderStyle(value: BorderStyle | unknown): value is BorderStyle {
  return BORDER_STYLE_OPTIONS.includes(value as BorderStyle);
}

const borderStyleAtom = atomWithHash<BorderStyle>("borderStyle", BORDER_STYLE_OPTIONS[0]);

export { borderStyleAtom };
