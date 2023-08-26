import axios from 'axios';

const getAds = async (token) => {
  const response = await axios.get('http://127.0.0.1:5000/api/ads', {
    headers: {                      
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const adService = {
  getAds,
};

export default adService;
