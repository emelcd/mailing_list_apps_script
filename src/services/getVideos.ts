import { SHEET_VIDEOS } from "../utils/constants"

const getVideos = (): string[][] => {
  if (!SHEET_VIDEOS) {
    throw new Error("Sheet not found")
  }
  return SHEET_VIDEOS.getRange('A2:B').getValues().filter(([el]) => el !== '')
}

export default getVideos