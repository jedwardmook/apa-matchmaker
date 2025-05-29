import { useState } from 'react';
import { useTeams } from './hooks/useTeams';
import { useTeamPlayers } from './hooks/useTeamPlayers';
import './App.css'

function App() {
  const { teams, loading, error } = useTeams();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>();
  const { players, loading: playersLoading, error: playersError } = useTeamPlayers({ id: selectedTeamId });
  console.log('App', playersError)


  return (
    <>
      <main className="App">
        <h1>Teams</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {teams.length > 0 ? (
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <p onClick={() => setSelectedTeamId(team.id)}>{team.team_name}</p>
                {playersLoading && <p>Loading...</p>}
                {players && selectedTeamId === team.id && (
                  <ul>
                    {players.map((player) => (
                      <li key={player.id}>
                        {player.first_name} {player.last_name} (#{player.player_number})
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
