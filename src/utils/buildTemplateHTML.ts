import { TEMPLATE_EMAIL_HTML } from "./constants";

export const mapHTMLTemplate = (username: string, videoID: string, videoDescription: string) => {
  return TEMPLATE_EMAIL_HTML
    .replace("{{username}}", username)
    .replaceAll("{{videoID}}", videoID)
    .replace("{{videoDescription}}", videoDescription)
};
