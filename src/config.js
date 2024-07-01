const BASE_URL = "https://netrunner.life:4000";

export const API = {
  EMAILSEND: `${BASE_URL}/email/send`,
  EMAILCHECK: `${BASE_URL}/email/check`,
  LOGOUT: `${BASE_URL}/auth/signout`,
  PROFILECARD: `${BASE_URL}/auth/`,
  MISSION: `${BASE_URL}/missions/`,
  TERM: `${BASE_URL}/term`,
  GUI: `${BASE_URL}/gui`,
  TOOLS: `${BASE_URL}/missions/tools`,
  POINTS: `${BASE_URL}/missions/points/`,
  SIGNIN: `${BASE_URL}/auth/signin`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  SIGNOUT: `${BASE_URL}/auth/signout`,
  CHANGEPASS: `${BASE_URL}/auth/changepass`,
  USERFILE: `${BASE_URL}/filesystem/`,
  MISSIONCOMPLETE: `${BASE_URL}/missions/complete`,
  RANKING: `${BASE_URL}/rank`
};