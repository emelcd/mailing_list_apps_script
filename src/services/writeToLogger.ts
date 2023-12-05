import { LoggerVideos } from "../interfaces/loggerInterface";
import { SHEET_LOGGER } from "../utils/constants";

const writeToLogger = (logData: LoggerVideos[]) => {
  const formatDate = logData.map(l => {
    // join the array by commas
    return [l.username, l.videoIDs.join(',')]
  })
  SHEET_LOGGER.getRange('A2:B').clearContent()
  SHEET_LOGGER.getRange(2, 1, formatDate.length, 2).setValues(formatDate)
  console.log('Logger updated')
}

export default writeToLogger