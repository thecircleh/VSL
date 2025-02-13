import React from 'react';
import './Court.css';

const Court = ({ activePlayers, onRotate }) => {
  // Court positions indexed as typical volleyball numbering
  const courtPositions = [
    { id: 1, label: "P1 (Server)" }, // Back right
    { id: 2, label: "P2" }, // Back middle
    { id: 3, label: "P3" }, // Back left
    { id: 4, label: "P4" }, // Front left
    { id: 5, label: "P5" }, // Front middle
    { id: 6, label: "P6" }  // Front right
  ];

  return (
    <div className="court-container">
      <h3>Volleyball Court</h3>
      <div className="court">
        {courtPositions.map((pos, index) => (
          <div key={pos.id} className={`court-position position-${pos.id}`}>
            <span>{pos.label}</span>
            <div className="player-box">
              {activePlayers[index] ? activePlayers[index].name : "-"}
            </div>
          </div>
        ))}
      </div>
      <button onClick={onRotate}>Rotate</button>
    </div>
  );
};

export default Court;
