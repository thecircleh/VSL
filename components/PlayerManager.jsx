import React, { useState } from "react";

const PlayerManager = ({ players, setPlayers, updateActivePlayers }) => {
  const [newPlayerName, setNewPlayerName] = useState("");

  const addPlayer = () => {
    if (newPlayerName.trim() === "") return;
    setPlayers(prev => [
      ...prev,
      { id: prev.length + 1, name: newPlayerName, active: false }
    ]);
    setNewPlayerName("");
  };

  const toggleActiveStatus = (playerId) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId ? { ...p, active: !p.active } : p
      )
    );
    setTimeout(updateActivePlayers, 50); // ✅ Ensure update happens after state change
  };

  const removePlayer = (playerId) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    updateActivePlayers();
  };

  return (
    <div>
      <h3>Manage Players</h3>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            {player.name}
            <button onClick={() => toggleActiveStatus(player.id)}>
              {player.active ? "Deactivate" : "Activate"}
            </button>
            <button onClick={() => removePlayer(player.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Player Name"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
      />
      <button onClick={addPlayer}>Add Player</button>
    </div>
  );
};

export default PlayerManager;




