import MailBuilder from "./core/mailBuilder";

export const main = async () => {
  const mailBuilder = new MailBuilder();
  // mailBuilder.createSheet(); // Uncomment this line to create a new spreadsheet
  mailBuilder.sendEmails();
}
