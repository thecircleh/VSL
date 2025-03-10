import React, { useState, useEffect } from "react";
import { FaVolleyballBall, FaHandPaper, FaShieldAlt, FaArrowUp, FaCogs } from 'react-icons/fa';
import CourtView from "./components/CourtView";
import MatchLog from "./components/MatchLog";
import PlayerManager from "./components/PlayerManager";
import PlayerSelector from "./components/PlayerSelector";
import StatButtons from "./components/StatButtons";
import StatPreview from "./components/StatPreview";

const primaryActions = [
  { name: "Serve", icon: <FaVolleyballBall /> },
  { name: "Dig", icon: <FaHandPaper /> },
  { name: "Set", icon: <FaCogs /> },
  { name: "Attack", icon: <FaArrowUp /> },
  { name: "Block", icon: <FaShieldAlt /> }
];

const actionResults = {
  Serve: ["Error", "Ace", "Zero"],
  Dig: ["Error", "Success"],
  Set: ["Error", "Assist", "Zero"],
  Attack: ["Error", "Kill", "Zero"],
  Block: ["Error", "Kill", "Zero"]
};

function App() {
  const [players, setPlayers] = useState([]);
  const [activePlayers, setActivePlayers] = useState([]);
  const [courtLocked, setCourtLocked] = useState(false);
  const [logs, setLogs] = useState([]);
  const [ballPosition, setBallPosition] = useState(null);
  const [touches, setTouches] = useState([]);
  const [lastTouchedPlayer, setLastTouchedPlayer] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [savedTeams, setSavedTeams] = useState({});
  const [currentSet, setCurrentSet] = useState(1);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem("savedTeams")) || {};
    setSavedTeams(storedTeams);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedTeams", JSON.stringify(savedTeams));
  }, [savedTeams]);

const updateActivePlayers = () => {
  setActivePlayers(players.filter(player => player.active).slice(0, 6));
};


  const toggleCourtLock = () => {
    setCourtLocked(prev => !prev);
    if (!courtLocked) {
      setBallPosition({ top: "50%", left: "50%" });
      setTouches([]);
      setLastTouchedPlayer(null);
    }
  };

  const logStat = (playerName, action) => {
    setLogs(prevLogs => [
      ...prevLogs,
      { player: playerName, action, set: currentSet, timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  const handleBallMove = (newPosition) => {
    setBallPosition(newPosition);
  };

  const handlePlayerTouch = (player) => {
    if (courtLocked && !touches.includes(player.name)) {
      setTouches(prev => [...prev, player.name]);
      setLastTouchedPlayer(player);

      let action = ["Dig", "Set", "Attack"][touches.length] || "";
      if (action) logStat(player.name, action);

      if (touches.length >= 2) setTouches([]);
    }
  };

  const handleTeamNameChange = (e) => {
    const newTeamName = e.target.value;
    setTeamName(newTeamName);
    if (savedTeams[newTeamName]) {
      setPlayers(savedTeams[newTeamName]);
      updateActivePlayers();  // ✅ Ensure active players update after loading team
    } else {
      setPlayers([]);
      setActivePlayers([]);  // ✅ Clear active players if the team is not found
    }
  };

  const saveTeam = () => {
    if (!teamName.trim() || players.length === 0) {
      alert("Enter a valid team name and at least one player before saving.");
      return;
    }
    const updatedTeams = { ...savedTeams, [teamName]: players };
    setSavedTeams(updatedTeams);
    localStorage.setItem("savedTeams", JSON.stringify(updatedTeams));
  };

  const rotatePlayers = () => {
    if (activePlayers.length === 6) {
      setActivePlayers(prev => [
        prev[3], prev[0], prev[1], prev[4], prev[5], prev[2]
      ]);
    }
  };

  return (
    <div className="container">
      <h1>Volleyball Stat Logger</h1>

      <div className="team-management">
        <label>Team Name: </label>
        <input type="text" value={teamName} onChange={handleTeamNameChange} list="team-suggestions" />
        <datalist id="team-suggestions">
          {Object.keys(savedTeams).map((team, index) => (
            <option key={index} value={team} />
          ))}
        </datalist>
        <button onClick={saveTeam}>Save Team</button>

        <label>Opponent: </label>
        <input type="text" value={opponentName} onChange={(e) => setOpponentName(e.target.value)} />
      </div>

      <div className="set-management">
        <button onClick={() => setCurrentSet(prev => Math.max(1, prev - 1))}>Previous Set</button>
        <span>Current Set: {currentSet}</span>
        <button onClick={() => setCurrentSet(prev => prev + 1)}>Next Set</button>
      </div>

      <div className="court-controls">
        <button onClick={toggleCourtLock}>
          {courtLocked ? "Unlock Court" : "Lock Court"}
        </button>
        <button onClick={rotatePlayers}>Rotate Players</button>
      </div>

      <CourtView
        activePlayers={activePlayers}
        setActivePlayers={setActivePlayers}
        rotatePlayers={rotatePlayers}
        logStat={logStat}
        ballPosition={ballPosition}
        onBallMove={handleBallMove}
        onPlayerTouch={handlePlayerTouch}
        courtLocked={courtLocked}
        lastTouchedPlayer={lastTouchedPlayer}
      />

      <PlayerManager players={players} setPlayers={setPlayers} updateActivePlayers={updateActivePlayers} />

      <PlayerSelector players={players} setActivePlayers={setActivePlayers} />

      <StatButtons 
        primaryActions={primaryActions} 
        actionResults={actionResults} 
        players={activePlayers || []}  
        onLog={logStat} 
      />

      <StatPreview 
        logs={logs} 
        teamName={teamName} 
        opponentName={opponentName} 
        currentSet={currentSet}
      />

      <MatchLog logs={logs} />
    </div>
  );
}

export default App;
