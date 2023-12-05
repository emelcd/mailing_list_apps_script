import { LoggerVideos } from "../interfaces/loggerInterface";
import { SHEET_LOGGER } from "../utils/constants";

const mapLogger = (arr: string[][]): LoggerVideos[] => {
  return arr.reduce((acc: LoggerVideos[], [username, videoIDs]) => {
    const videoIDsArray = videoIDs.split(',').map(el => el.trim())
    return [...acc, { username, videoIDs: videoIDsArray }]
  }, [])
}

const getLogger = () => {
  if (!SHEET_LOGGER) {
    throw new Error("Sheet not found")
  }
  const loggerValues = SHEET_LOGGER.getRange('A2:B').getValues().filter(([el]) => el !== '')
  return mapLogger(loggerValues)
}

export default getLogger