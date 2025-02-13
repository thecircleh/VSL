import React from "react";

const PlayerSelector = ({ players = [], setActivePlayers }) => {
  const handleSelection = (event) => {
    const selectedPlayerId = parseInt(event.target.value);
    setActivePlayers(prev => {
      if (!prev.some(player => player.id === selectedPlayerId)) {
        const selectedPlayer = players.find(p => p.id === selectedPlayerId);
        return selectedPlayer ? [...prev, selectedPlayer] : prev;
      }
      return prev;
    });
  };

  return (
    <div>
      <h3>Select Active Players</h3>
      <select onChange={handleSelection}>
        <option value="">-- Select Player --</option>
        {players.map(player => (
          <option key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlayerSelector;



