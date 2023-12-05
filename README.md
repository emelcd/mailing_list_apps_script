# Project Name

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

Brief description of your project goes here.

## Table of Contents

- [Installation](#installation)
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
3. Copy the contents of `dist/main.js` into your Google Apps Script project.

## Usage

1. Use the method `createSheet` to create a new sheet with the name of your choice.
2. Copy the ID of the sheet and paste it into the `SHEET_ID` variable in `src/constants.ts`.
3. Fill the sheet with wanted data.
4. Build the project and copy the contents of `build/main.js` into your Google Apps Script project.
5. Add the function `main` to a time-driven trigger.

## Contributing

Contributions are welcome! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

This project is licensed under the terms of the [MIT License](LICENSE).

## Acknowledgements

- [Google Apps Script](https://developers.google.com/apps-script)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Google Gmail API](https://developers.google.com/gmail/api)

## Contact

- [emelcd](mailto:mortadelatrix@proton.me)
