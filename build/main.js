"use strict";

// src/services/generateSheet.ts
var createSpreadsheet = (name = "EMAIL_LIST") => {
  const spreadsheet = SpreadsheetApp.create(name);
  const usernamesSh = spreadsheet.insertSheet("Usernames");
  usernamesSh.appendRow(["Username"]);
  usernamesSh.appendRow(["emailadress"]);
  const videosSH = spreadsheet.insertSheet("Videos");
  videosSH.appendRow(["Video ID", "Video Description"]);
  videosSH.appendRow(["dQw4w9WgXcQ", "Best video of all time"]);
  const loggerSH = spreadsheet.insertSheet("Logger");
  loggerSH.appendRow(["Username", "Video IDs"]);
  spreadsheet.deleteSheet(spreadsheet.getSheetByName("Sheet1"));
  Logger.log("Spreadsheet URL: " + spreadsheet.getUrl());
  Logger.log("Copy this in the src/utils/constants.ts: " + spreadsheet.getId());
};
var generateSheet_default = createSpreadsheet;

// src/utils/constants.ts
var SHEET_ID = "1N9J0q-suUPzdGWdBobSroU9-OsDpyiwO5Cp65LEwdog";
var SPREADSHEET = SpreadsheetApp.openById(SHEET_ID);
var SHEET_NAMES = SPREADSHEET.getSheetByName("Usernames");
var SHEET_VIDEOS = SPREADSHEET.getSheetByName("Videos");
var SHEET_LOGGER = SPREADSHEET.getSheetByName("Logger");
var TEMPLATE_EMAIL_HTML = `
<html>
  <body style="font-family: 'Courier New', Courier, monospace">
    <table
      style="border: 1px solid gray; width: 600px; border-collapse: collapse"
    >
      <tr>
        <th
          align="center"
          style="border: 1px solid gray; background: whitesmoke; padding: 10px"
        >
          <h1>Ey, <span style="color: #4285F4">{{username}}</span>!</h1>
        </th>
      </tr>
      <tr>
        <th style="border: 1px solid gray; padding: 10px; text-align: center">
            <a
              href="https://www.youtube.com/watch?v={{videoID}}"
              target="_blank"
            >
              <img
                src="https://img.youtube.com/vi/{{videoID}}/0.jpg"
                alt="video"
              />
            </a>
        </th>
      </tr>
      <tr>
        <td style="padding: 10px">
          <p>{{videoDescription}}</p>
          <hr />
          <p style="font-size: 10px">
            <strong>Disclaimer:</strong> This is an automated email. Please do
            not reply to this email. 
            <hr>
            <code style="font-size: 10px">
              If you want to know how this script is
              built check the <a href="https://github.com/emelcd/mailing_list_apps_script">source code</a>.
            </code>
          </p>
          <!-- add copyrigth -->
            <p
              style="font-size: 8px; text-align: right; color: gray"
            
            >&copy; 2023 <a href="https://github.com/emelcd">emelcd</a>. All rights reserved.
            </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// src/services/getLogger.ts
var mapLogger = (arr) => {
  return arr.reduce((acc, [username, videoIDs]) => {
    const videoIDsArray = videoIDs.split(",").map((el) => el.trim());
    return [...acc, { username, videoIDs: videoIDsArray }];
  }, []);
};
var getLogger = () => {
  if (!SHEET_LOGGER) {
    throw new Error("Sheet not found");
  }
  const loggerValues = SHEET_LOGGER.getRange("A2:B").getValues().filter(([el]) => el !== "");
  return mapLogger(loggerValues);
};
var getLogger_default = getLogger;

// src/services/getUsernames.ts
var getUsernames = () => {
  if (!SHEET_NAMES) {
    throw new Error("Sheet not found");
  }
  return SHEET_NAMES.getRange("A2:A").getValues().flat().filter(Boolean);
};
var getUsernames_default = getUsernames;

// src/services/getVideos.ts
var getVideos = () => {
  if (!SHEET_VIDEOS) {
    throw new Error("Sheet not found");
  }
  return SHEET_VIDEOS.getRange("A2:B").getValues().filter(([el]) => el !== "");
};
var getVideos_default = getVideos;

// src/services/writeToLogger.ts
var writeToLogger = (logData) => {
  const formatDate = logData.map((l) => {
    return [l.username, l.videoIDs.join(",")];
  });
  SHEET_LOGGER.getRange("A2:B").clearContent();
  SHEET_LOGGER.getRange(2, 1, formatDate.length, 2).setValues(formatDate);
  console.log("Logger updated" + /* @__PURE__ */ new Date() + " " + SHEET_LOGGER.getParent().getUrl());
};
var writeToLogger_default = writeToLogger;

// src/utils/addDomain.ts
var usernameToEmail = (username, domain = "gmail.com") => {
  return `${username}@${domain}`;
};
var addDomain_default = usernameToEmail;

// src/utils/htmlGenerator.ts
var generateHTMLTemplate = (username, videoID, videoDescription) => {
  return TEMPLATE_EMAIL_HTML.replace("{{username}}", username).replaceAll("{{videoID}}", videoID).replace("{{videoDescription}}", videoDescription);
};
var htmlGenerator_default = generateHTMLTemplate;

// src/core/mailBuilder.ts
var MailBuilder = class {
  constructor() {
    this.generateMail = (username, videoId, videoDescription) => {
      return htmlGenerator_default(username, videoId, videoDescription);
    };
    this.unsentVideos = (username) => {
      var _a;
      const allVideos = this.videos.map(([videoId]) => videoId);
      const sentVideos = (_a = this.logged.find((el) => el.username === username)) == null ? void 0 : _a.videoIDs;
      if (!sentVideos)
        return allVideos;
      return allVideos.filter((videoId) => !sentVideos.includes(videoId));
    };
    this.recordLogVideos = (username, videoId) => {
      const userIndex = this.logged.findIndex((el) => el.username === username);
      if (userIndex === -1) {
        this.logged.push({ username, videoIDs: [videoId] });
      } else {
        this.logged[userIndex].videoIDs.push(videoId);
      }
    };
    this.writeToLogger = () => {
      writeToLogger_default(this.logged);
    };
    this.createSheet = () => {
      generateSheet_default();
    };
    this.sendEmails = () => {
      this.usernames.forEach((username) => {
        var _a;
        const unsentVideos = this.unsentVideos(username);
        if (!unsentVideos.length)
          return;
        const videoId = unsentVideos[Math.floor(Math.random() * unsentVideos.length)];
        const videoDescription = ((_a = this.videos.find(([id]) => id === videoId)) == null ? void 0 : _a[1]) || "No description";
        this.recordLogVideos(username, videoId);
        const mail = this.generateMail(username, videoId, videoDescription);
        GmailApp.sendEmail(addDomain_default(username), "Ey", "", { htmlBody: mail });
        Logger.log(`Email sent to ${username}`);
      });
      this.writeToLogger();
    };
    this.usernames = getUsernames_default();
    this.videos = getVideos_default();
    this.logged = getLogger_default();
  }
};
var mailBuilder_default = MailBuilder;

// src/index.ts
var main = async () => {
  const mailBuilder = new mailBuilder_default();
  mailBuilder.sendEmails();
};
main();
