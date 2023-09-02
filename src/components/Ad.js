import React, { useState, useEffect } from "react";
import adService from "../services/ad";

const Ad = ({ token, user }) => {
  const [ads, setAds] = useState([]);
  const [recommendedAds, setRecommendedAds] = useState([]);
  const [popularAds, setPopularAds] = useState([]);
  const [showRecommended, setShowRecommended] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("Popular");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await adService.getAds(token, user.sub);
        setAds(response);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchRecommendedAds = async () => {
      try {
        const response = await adService.getRecommendedAds(token, user.sub);
        setRecommendedAds(response);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPopularAds = async () => {
      try {
        const response = await adService.getPopularAdsUser(token, user.sub);
        setPopularAds(response);
      } catch (err) {
        console.error(err);
      }
    };

    if (recommendedAds.length > 0) {
      setShowRecommended(true);
      setSectionTitle("Recommended Ads");
    } else {
      setShowRecommended(false);
      setSectionTitle("Popular Ads");
    }
    fetchRecommendedAds();
    fetchPopularAds();
    fetchAds();
  }, [token, user, recommendedAds.length]);

  const handleAdClick = async (adId, adData) => {
    try {
      const updatedAd = await adService.updateClicks(token, adId, adData);
      adService.saveAdUserInteraction(token, user.sub, adId);
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === adId ? { ...ad, clicks: updatedAd.clicks } : ad
        )
      );
      const recommendedResponse = await adService.getRecommendedAds(
        token,
        user.sub
      );
      setRecommendedAds(recommendedResponse);
      const popularResponse = await adService.getPopularAdsUser(
        token,
        user.sub
      );
      setPopularAds(popularResponse);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveAd = async (adId, adData) => {
    const updatedAdData = { ...adData, approved: true };

    try {
      await adService.approveAd(token, adId, updatedAdData);
      setRecommendedAds((prevAds) =>
        prevAds.map((ad) => (ad.id === adId ? { ...ad, approved: true } : ad))
      );
    } catch (err) {
      console.error(err);
    }
  };
  const recommendedAdIds = new Set(recommendedAds.map((ad) => ad.id));
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mt-4">
          <h2 className="App-title">Ads</h2>
          <div className="row">
            {ads.map((ad) => (
              <div className={`col-md-4 mb-4`} key={ad.id}>
                <div
                  className={`card ${
                    recommendedAdIds.has(ad.id) ? "App-recommended-ad" : ""
                  } mr-4`}
                >
                  <div className="card-body">
                    <h5 className="card-title">{ad.ad}</h5>
                    <p className="card-text">
                      <strong>Audiences:</strong> {ad.audiences}
                    </p>
                    <p className="card-text">
                      <strong>Recommendations:</strong> {ad.recommendations}
                    </p>
                    <p className="card-text">
                      <strong>Clicks:</strong> {ad.clicks}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAdClick(ad.id, ad)}
                    >
                      Click Me
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4 mt-4">
          <h2 className="App-title">{sectionTitle}</h2>
          <div className="row">
            <div className="App-recommended-ads-container">
              {showRecommended
                ? recommendedAds.map((ad) => (
                    <div className="card mb-4" key={ad.id}>
                      <div className="card-body">
                        <h5 className="card-title">{ad.ad}</h5>
                        <p className="card-text">
                          <strong>Audiences:</strong> {ad.audiences}
                        </p>
                        <p className="card-text">
                          <strong>Recommendations:</strong> {ad.recommendations}
                        </p>
                        <p className="card-text">
                          <strong>Approved:</strong>{" "}
                          {ad.approved ? "Yes" : "No"}
                        </p>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApproveAd(ad.id, ad)}
                          disabled={ad.approved}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  ))
                : popularAds.map((ad) => (
                    <div className="card mb-4 App-popular-ad" key={ad.id}>
                      <div className="card-body">
                        <h5 className="card-title">{ad.ad}</h5>
                        <p className="card-text">
                          <strong>Audiences:</strong> {ad.audiences}
                        </p>
                        <p className="card-text">
                          <strong>Recommendations:</strong> {ad.recommendations}
                        </p>
                        <p className="card-text">
                          <strong>Approved:</strong>{" "}
                          {ad.approved ? "Yes" : "No"}
                        </p>
                        <p className="card-text">
                          <strong>Clicks:</strong> {ad.clicks}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ad;
