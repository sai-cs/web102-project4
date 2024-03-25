import React from 'react';

const BanList = ({ banList, removeFromBanList }) => {
  const handleRemove = (item) => {
    removeFromBanList(item);
  };

  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      {banList.length === 0 ? (
        <p>No items banned yet.</p>
      ) : (
        <ul>
          {banList.map(item => (
            <li key={item}>
              <button onClick={() => handleRemove(item)}>{item}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BanList;
