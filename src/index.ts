import MailBuilder from "./core/mailBuilder";

const main = async () => {
  const mailBuilder = new MailBuilder();
  // mailBuilder.createSheet(); // Uncomment this line to create a new spreadsheet and add the ID to the code
  mailBuilder.sendEmails();
}

main();