import React, { useState } from 'react';

const StatButtons = ({ primaryActions, actionResults, players = [], onLog }) => { // ✅ Ensures players is always an array
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedSetter, setSelectedSetter] = useState(null);
  const [selectedAttacker, setSelectedAttacker] = useState(null);

  return (
    <div>
      <h3>Log Stats</h3>

      {!selectedAction ? (
        <div>
          <h4>Select Action</h4>
          {primaryActions.map(({ name, icon }) => (
            <button key={name} onClick={() => setSelectedAction(name)}>
              {icon} {name}
            </button>
          ))}
        </div>
      ) : !selectedResult ? (
        <div>
          <h4>Result for {selectedAction}</h4>
          {actionResults[selectedAction]?.map((result) => (
            <button key={result} onClick={() => setSelectedResult(result)}>
              {result}
            </button>
          ))}
        </div>
      ) : selectedAction === "Set" && selectedResult === "Assist" ? (
        <div>
          <h4>Select Setter</h4>
          <select onChange={(e) => setSelectedSetter(e.target.value)}>
            <option value="">-- Select Setter --</option>
            {players.length > 0 ? (
              players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            ) : (
              <option disabled>No Players Available</option>
            )}
          </select>
          <h4>Select Attacker</h4>
          <select onChange={(e) => setSelectedAttacker(e.target.value)}>
            <option value="">-- Select Attacker --</option>
            {players.length > 0 ? (
              players.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            ) : (
              <option disabled>No Players Available</option>
            )}
          </select>
          <button
            onClick={() => {
              if (!selectedSetter || !selectedAttacker) return;
              onLog("Set", "Assist", selectedSetter);
              onLog("Attack", "Kill", selectedAttacker);
              setSelectedAction(null);
              setSelectedResult(null);
            }}
          >
            Log Assist & Kill
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            onLog(selectedAction, selectedResult);
            setSelectedAction(null);
            setSelectedResult(null);
          }}
        >
          Log {selectedAction} - {selectedResult}
        </button>
      )}

      <button onClick={() => setSelectedAction(null)}>Cancel</button>
    </div>
  );
};

export default StatButtons;




