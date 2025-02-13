import React from 'react';

const MatchLog = ({ logs }) => {
  return (
    <div>
      <h3>Live Match Log</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.player} - {log.action} → {log.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchLog;
