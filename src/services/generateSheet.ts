const createSpreadsheet = (name: string = "EMAIL_LIST") => {
  // Create a new spreadsheet
  const spreadsheet = SpreadsheetApp.create(name);

  // Add sheets to the spreadsheet
  const usernamesSh = spreadsheet.insertSheet('Usernames');
  usernamesSh.appendRow(['Username']);
  usernamesSh.appendRow(['mick.altura']);
  const videosSH = spreadsheet.insertSheet('Videos');
  videosSH.appendRow(['Video ID', 'Video Description']);
  videosSH.appendRow(['Q2cTbsXYu6E', 'This is a video description']);
  const loggerSH = spreadsheet.insertSheet('Logger');
  loggerSH.appendRow(['Username', 'Video IDs']);


  // delete the Sheet1
  spreadsheet.deleteSheet(spreadsheet.getSheetByName('Sheet1')!);
  // Log the URL of the newly created spreadsheet
  Logger.log('Spreadsheet URL: ' + spreadsheet.getUrl());
  Logger.log('Copy this in the src/utils/constants.ts: ' + spreadsheet.getId());
}

export default createSpreadsheet