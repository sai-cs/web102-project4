import React, { useState, useEffect } from 'react';

const RandomItem = ({ banList, addToBanList, accessKey }) => {
  const [catData, setCatData] = useState(null);
  const [catInfo, setCatInfo] = useState(null);

  useEffect(() => {
    fetchRandomCat();
  }, []); // Fetch a random cat when the component mounts

  const fetchRandomCat = async () => {
    try {
      // Make an API call to fetch a random cat
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${accessKey}`);
      const data = await response.json();

      // Set the cat data in the state
      setCatData(data[0]);

      // Fetch detailed information about the cat
      fetchCatInfo(data[0].id);
    } catch (error) {
      console.error('Error fetching random cat:', error);
    }
  };

  const fetchCatInfo = async (catId) => {
    try {
      // Make an API call to fetch detailed information about the cat
      const response = await fetch(`https://api.thecatapi.com/v1/images/${catId}?api_key=${accessKey}`);
      const data = await response.json();

      // Set the cat information in the state
      setCatInfo(data.breeds && data.breeds.length > 0 ? data.breeds[0] : null);
    } catch (error) {
      console.error('Error fetching cat info:', error);
    }
  };

  const handleBan = (trait) => {
    addToBanList(trait);
  };

  const handleExplore = () => {
    fetchRandomCat(); // Fetch a new random cat image
  };

  return (
    <div className="random-item">
      {catData ? (
        <div>
          <img src={catData.url} alt="Random Cat" />
          <div>
            {/* Display additional information about the cat */}
            {catInfo && (
              <>
                <button onClick={() => handleBan(catInfo.name)}>{catInfo.name}</button>
                <button onClick={() => handleBan(catInfo.origin)}>Origin: {catInfo.origin}</button>
                <button onClick={() => handleBan(`Weight: ${catInfo.weight?.imperial} lb`)}>Weight: {catInfo.weight?.imperial} lb</button>
                <button onClick={() => handleBan(`Age: ${catInfo.life_span?.split('-')[0]}-${catInfo.life_span?.split('-')[1]} years`)}>Age: {catInfo.life_span}</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleExplore}>Explore</button>
    </div>
  );
};

export default RandomItem;
