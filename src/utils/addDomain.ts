export const usernameToEmail = (username: string, domain: string = 'gmail.com') => {
  return `${username}@${domain}`
}