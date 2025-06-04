import { useState } from 'react';
import { useTeams } from './hooks/useTeams';
import { useTeamPlayers } from './hooks/useTeamPlayers';
import './App.css'
import SkillLevelForm from './components/skillLevelForm';

function App() {
  const { teams, loading, error } = useTeams();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const { players, loading: playersLoading, error: playersError } = useTeamPlayers({ id: selectedTeamId });
  const [selectedForm, setSelectedForm] = useState<string | null>(null);

  switch (selectedForm) {
    case 'match':
      return (
        <div>
          <button onClick={() => setSelectedForm(null)}>Return</button>
          Add Match Form
        </div>
        );
    case 'team':
      return (
        <div>
          <button onClick={() => setSelectedForm(null)}>Return</button>
          Add Team Form
        </div>
        );
    case 'player':
      return (
        <div>
          <button onClick={() => setSelectedForm(null)}>Return</button>
          Add Player Form
        </div>
        );
    case 'skillLevel':
      return (
        // <div>
        //   <button onClick={() => setSelectedForm(null)}>Return</button>
        //   <form>
        //     <label>
        //       Team:
        //       <select onChange={handleTeamChange} value={selectedTeam || ''}>
        //         <option value="">Select a team</option>
        //         {teams.length > 0 && teams.map((team) => (
        //           <option key={team.id} value={team.team_name}>
        //             {team.team_name}
        //           </option>
        //         ))}
        //       </select>
        //     </label>
        //     {players && players.length > 0 &&
        //       <label>
        //         Player:
        //         <select value={selectedPlayer || ''} onChange={handlePlayerChange}>
        //           <option value="">Select a player</option>
        //           {players && players.map((player) => (
        //             <option key={player.id} value={player.full_name}>
        //               {player.full_name}
        //             </option>
        //           ))}
        //         </select>
        //       </label>
        //     }
        //     {selectedPlayer && (
        //       <>
        //       <label>
        //         Current Skill Level: {player?.latest_skill_level || ''}
        //       </label>
        //       <label>
        //         New Skill Level:
        //         <select>
        //           <option value=""> </option>
        //           {possibleSkillLevels
        //             .filter((level) => level !== player?.latest_skill_level)
        //             .map((level) => (
        //             <option key={level} value={level}>
        //               {level}
        //             </option>
        //           ))}
        //         </select>
        //       </label>
        //       </>
        //     )}
        //   </form>
        // </div>
        <SkillLevelForm
          setSelectedForm={setSelectedForm}
        />
        );
    case null:
    // Default case, do nothing
      break;
  }

  return (
    <>
      <main className="App">
        <div>
          <button onClick={() => setSelectedForm('match')}>Add Match</button>
          <button onClick={() => setSelectedForm('team')}>Add Team</button>
          <button onClick={() => setSelectedForm('player')}>Add Player</button>
          <button onClick={() => setSelectedForm('skillLevel')}>Add Skill Level</button>
        </div>
        <div>
          {}
        </div>
        <h1>Teams</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {teams.length > 0 ? (
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <p onClick={() => setSelectedTeamId(team.id)}>{team.team_name}</p>
                {playersLoading && <p>Loading...</p>}
                {playersError && selectedTeamId === team.id && <p>Error: {playersError}</p>}
                {players && selectedTeamId === team.id && (
                  <ul>
                    {players.map((player) => (
                      <li key={player.id}>
                        {player.full_name} (#{player.player_number}) Skill Level: {player.latest_skill_level}
                      </li>
                    ))}
                  </ul>
              )}
            </li>
          ))}
        </ul>
        ) : (
          !loading && <p>No teams found.</p>
        )}
      </main>
    </>
  )
}

export default App
