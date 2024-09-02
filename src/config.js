const BASE_URL = "https://netrunner.life:4000";

export const API = {
  EMAILSEND: `${BASE_URL}/email/send`,
  EMAILCHECK: `${BASE_URL}/email/check`,
  LOGOUT: `${BASE_URL}/auth/signout`,
  PROFILECARD: `${BASE_URL}/auth/`,
  MISSION: `${BASE_URL}/missions/`,
  TERM: `${BASE_URL}/term`,
  GUI: `${BASE_URL}/gui`,
  TOOLS: `${BASE_URL}/missions/tools/`,
  POINTS: `${BASE_URL}/missions/points/`,
  SIGNIN: `${BASE_URL}/auth/signin`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  SIGNOUT: `${BASE_URL}/auth/signout`,
  CHANGEPASS: `${BASE_URL}/auth/changepass`,
  USERFILE: `${BASE_URL}/filesystem/`,
  MISSIONCOMPLETE: `${BASE_URL}/missions/complete`,
  RANKING: `${BASE_URL}/auth/ranking/rank`,
  PURCHASE: `${BASE_URL}/missions/tool/`,
  IDCHECK: `${BASE_URL}/auth/check`
};

/**
 * Fetch mission data by mission ID
 * @param {string} missionID - The ID of the mission to fetch
 * @param {string} token - The user's access token
 * @returns {Promise<Object>} The mission data
 */
export const fetchMissionData = async (missionID, token) => {
  try {
    const response = await fetch(`${API.MISSION}${missionID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched mission data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching mission data:', error);
    throw error;
  }
};

/**
 * Fetch profile data by user ID
 * @param {string} userId - The ID of the user
 * @param {string} token - The user's access token
 * @returns {Promise<Object>} The profile data
 */
export const fetchProfileData = async (userId, token) => {
  try {
    const response = await fetch(`${API.PROFILECARD}${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched profile data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
};

// 필요한 다른 API 호출 함수들도 여기에 추가할 수 있습니다.
