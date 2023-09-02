import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
const getAds = async (token, userId) => {
  const response = await axios.get(`${API_URL}/api/ads/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateClicks = async (token, adId, adData) => {
  try {
    const response = await fetch(
      `${API_URL}/api/ads/click/${adId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to update clicks");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const saveAdUserInteraction = async (token, userId, adId) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/ads/interactions`,
      {
        user_id: userId,
        ad_id: adId,
        clicked: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getRecommendedAds = async (token, userId) => {
  const response = await axios.get(
    `${API_URL}/api/ads/recommended/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const approveAd = async (token, adId, adData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/ads/approve/${adId}`,
      adData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getPopularAdsUser = async (token, userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/ads/popular/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


const resetUserAds = async (token, userId) => {
  try {
    const response = await axios.put(`${API_URL}/api/ads/reset/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const adService = {
  getAds,
  updateClicks,
  saveAdUserInteraction,
  getRecommendedAds,
  approveAd,
  getPopularAdsUser,
  resetUserAds
};

export default adService;
