import React, { useState, useEffect } from 'react';
import adService from '../services/ad';

const Ad = ({ token }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await adService.getAds(token);
        setAds(response);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, [token]);

  return (
    <div className="container">
      <h2>Ads</h2>
      <div className="row">
        {ads.map((ad) => (
          <div className="col-md-4 mb-4" key={ad.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ad.ad}</h5>
                <p className="card-text"><strong>Audiences:</strong> {ad.audiences}</p>
                <p className="card-text"><strong>Recommendations:</strong> {ad.recommendations}</p>
                <p className="card-text"><strong>Clicks:</strong> {ad.clicks}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ad;

