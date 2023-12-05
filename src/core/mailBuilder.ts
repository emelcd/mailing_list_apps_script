import { LoggerVideos } from "../interfaces/loggerInterface"
import createSpreadsheet from "../services/generateSheet"
import getLogger from "../services/getLogger"
import getUsernames from "../services/getUsernames"
import getVideos from "../services/getVideos"
import writeToLogger from "../services/writeToLogger"
import usernameToEmail from "../utils/addDomain"
import generateHTMLTemplate from "../utils/htmlGenerator"

class MailBuilder {
  private usernames: string[]
  private videos: string[][]
  private logged: LoggerVideos[]
  constructor() {
    this.usernames = getUsernames()
    this.videos = getVideos()
    this.logged = getLogger()
  }



  private generateMail = (username: string, videoId: string, videoDescription: string) => {
    return generateHTMLTemplate(username, videoId, videoDescription)
  }

  private unsentVideos = (username: string) => {
    const allVideos = this.videos.map(([videoId]) => videoId)
    const sentVideos = this.logged.find(el => el.username === username)?.videoIDs
    if (!sentVideos) return allVideos
    return allVideos.filter(videoId => !sentVideos.includes(videoId))

  }

  private recordLogVideos = (username: string, videoId: string) => {
    const userIndex = this.logged.findIndex(el => el.username === username)
    if (userIndex === -1) {
      this.logged.push({ username, videoIDs: [videoId] })
    } else {
      this.logged[userIndex].videoIDs.push(videoId)
    }

  }

  private writeToLogger = () => {
    writeToLogger(this.logged)
  }

  public createSheet = () => {
    createSpreadsheet()
  }



  sendEmails = () => {
    this.usernames.forEach(username => {
      const unsentVideos = this.unsentVideos(username)
      if (!unsentVideos.length) return
      const videoId = unsentVideos[Math.floor(Math.random() * unsentVideos.length)]
      const videoDescription = this.videos.find(([id]) => id === videoId)?.[1] || 'No description'
      this.recordLogVideos(username, videoId)
      const mail = this.generateMail(username, videoId, videoDescription)
      GmailApp.sendEmail(usernameToEmail(username), 'Ey', '', { htmlBody: mail })
      Logger.log(`Email sent to ${username}`)

    })
    this.writeToLogger()
  }

}

export default MailBuilder