import { SHEET_NAMES } from "../utils/constants";

export const getUsernames = (): string[] => {
  if (!SHEET_NAMES) {
    throw new Error("Sheet not found");
  }
  return SHEET_NAMES.getRange('A2:A').getValues().flat().filter(Boolean)
}
