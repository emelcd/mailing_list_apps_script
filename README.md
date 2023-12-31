# Email List Apps Script

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

A mail list app script built with Google Apps Script. It uses Google Sheets as a database and Gmail to send emails.

The script will detect what videos has been sent to the user and will send a random video from the list. If the user has seen all the videos, it will not send any email.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/emelcd/mailing_list_apps_script
   cd mailing_list_apps_script
   npm/yarn/pnpm install
   ```

2. Run `npm/yarn/pnpm run build` to build the project.

## Development

I use LiveServer to edit the template, it's inside utils/index.html. Edit and copy to constants.ts TEMPLATE_EMAIL_HTML variable.

No using [`clasp`](https://github.com/google/clasp) but the `.claspignore` it's configured to deploy only the `build/main.js` file.

## Usage

1. ~~Use the method `createSheet` to create a new sheet with the name of your choice~~(BUG DETECTED, ONLY IF THE SHEET_ID IS ACCESIBLE). Or create manually, adding `Usernames`, `Videos` and `Logger` sheets (mandatory).
2. Copy the ID of the sheet and paste it into the `SHEET_ID` variable in `src/utils/constants.ts`.
3. Fill the sheet with wanted data.
   - The sheet Usernames is feed with the username of the email. Configured for using `@gmail.com` domain.
   - The sheet Videos is feed with the video ID of the video you want to send to the user. Configured for YouTube.
   - The sheet Logger is fill automatically.
4. Create a new [GAS](https://script.new/) project
5. Build the project and copy the contents of `build/main.js` into your Google Apps Script project. Delete the `main()` function at the end of the file(THIS IS NECCESARY BECAUSE USING esbuild).
6. (OPTIONAL) Add the function `main` to a time-driven trigger.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Feel free to contribute to this project.

## License

This project is licensed under the terms of the [MIT License](LICENSE).

## Acknowledgements

- [Google Apps Script](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Google Gmail API](https://developers.google.com/gmail/api)

## Contact

- [emelcd](mailto:mortadelatrix@proton.me)
