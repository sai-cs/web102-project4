import { useState } from 'react';
import BanList from './components/BanList';
import RandomItem from './components/RandomItem';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [banList, setBanList] = useState([]);

  const addToBanList = (item) => {
    setBanList([...banList, item]); // Add item to ban list
  };

  const removeFromBanList = (item) => {
    const updatedBanList = banList.filter(bannedItem => bannedItem !== item);
    setBanList(updatedBanList);
  };

  return (
    <div className="app">
      <h1>Discover New Things</h1>
      <div className="container">
        <RandomItem banList={banList} addToBanList={addToBanList} accessKey={ACCESS_KEY} />
        <BanList banList={banList} removeFromBanList={removeFromBanList} />
      </div>
    </div>
  );
}

export default App;
