import React, { useState } from 'react'
import { useTeams } from '../hooks/useTeams';
import { useTeamPlayers } from '../hooks/useTeamPlayers';
import { usePlayer } from '../hooks/usePlayer';

interface MatchFormProps {
  setSelectedForm: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Match {
  match_date: string | null;
  player_1_id: number | null;
  player_2_id: number | null;
  home_player_id: number | null;
  away_player_id: number | null;
  lag_winner_id: number | null;
  home_player_points_earned: number | null;
  away_player_points_earned: number | null;
  home_player_games_won: number | null;
  away_player_games_won: number | null;
  session_id: number | null;
  player_1_skill_level: number | null;
  player_2_skill_level: number | null;
  match_winner_id: number | null;
}

const MatchForm: React.FC<MatchFormProps> = ({ setSelectedForm }) => {
  const [homeTeamId, setHomeTeamId] = useState<number | null>(null);
  const [awayTeamId, setAwayTeamId] = useState<number | null>(null);
  const [homePlayerId, setHomePlayerId] = useState<number | null>(null);
  const [awayPlayerId, setAwayPlayerId] = useState<number | null>(null);
  const { teams } = useTeams();
  const { players : homePlayers } = useTeamPlayers({ id: homeTeamId });
  const { players : awayPlayers } = useTeamPlayers({ id: awayTeamId });
  const { player: homePlayer } = usePlayer({ id: homePlayerId  });
  const { player: awayPlayer } = usePlayer({ id: awayPlayerId });
  const [matchObject, setMatchObject] = useState<Match>({
    match_date: null,
    player_1_id: null,
    player_2_id: null,
    home_player_id: null,
    away_player_id: null,
    lag_winner_id: null,
    home_player_points_earned: null,
    away_player_points_earned: null,
    home_player_games_won: null,
    away_player_games_won: null,
    session_id: null,
    player_1_skill_level: null,
    player_2_skill_level: null,
    match_winner_id: null,
  });

  const updateMatchObject = <K extends keyof Match>(field: K, value: Match[K]) => {
    setMatchObject((prev) => (
      { 
        ...prev, 
        [field]: value 
      }));
  };
  console.log(matchObject)

  const handleMatchDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const matchDate = event.target.value;
    const matchDatesSplit = matchDate.split('-');
    const { year, month, day } = {
      year: matchDatesSplit[0],
      month: matchDatesSplit[1],
      day: matchDatesSplit[2],
    };
    updateMatchObject('match_date', `${year}, ${month}, ${day}`)
  }

  const handleHomeTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? Number(event.target.value) : null;
    setHomeTeamId(selectedId);
  }

  const handleAwayTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? Number(event.target.value) : null;
    setAwayTeamId(selectedId);
  }

  const handleHomePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? Number(event.target.value) : null;
    setHomePlayerId(selectedId);
    const homePlayer = homePlayers?.find(player => player.id === selectedId);
    updateMatchObject('home_player_id', selectedId);
    updateMatchObject('player_1_id', selectedId);
    updateMatchObject('player_1_skill_level', homePlayer?.latest_skill_level || null);
  }

  const handleAwayPlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value ? Number(event.target.value) : null;
    setAwayPlayerId(selectedId);
    const awayPlayer = awayPlayers?.find(player => player.id === selectedId);
    updateMatchObject('away_player_id', selectedId);
    updateMatchObject('player_2_id', selectedId);
    updateMatchObject('player_2_skill_level', awayPlayer?.latest_skill_level || null);
  }

  const handleLagCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const value = event.target.value ? Number(event.target.value) : null;
    // Handle lag checkbox change logic here
    updateMatchObject('lag_winner_id', isChecked ? value : null);
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <button onClick={() => setSelectedForm(null)}>Return</button>
          <h2>Add Match</h2>
        </div>
        <div>
          <span>Match Date: </span><input type='date' placeholder='Match Date' onChange={handleMatchDateChange}/>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
              Home Team:
              <select value={homeTeamId || ''} onChange={handleHomeTeamChange}>
                <option value="">Select a team</option>
                {teams
                  .filter((team) => team.id !== awayTeamId)
                  .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </label>
            {homePlayers && homePlayers.length > 0 && (
              <label>
                Player:
                <select value={homePlayerId || ''} onChange={handleHomePlayerChange}>
                  <option value="">Select a player</option>
                  {homePlayers && homePlayers.length > 0 && homePlayers
                    .map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.full_name}
                      </option>
                    ))}
                </select>
              </label>
            )}
            {homePlayer && (
              <div>
                <p>Player number: {homePlayer.player_number}</p>
                <p>Player skill level: {homePlayer.latest_skill_level}</p>
                <label>
                  Lag Winner:
                  <input 
                    type="checkbox" 
                    onChange={handleLagCheckboxChange} 
                    value={homePlayerId ?? ''}
                    disabled={matchObject.lag_winner_id === awayPlayerId}
                  />
                </label>
              </div>
            )}
          </form>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
              Away Team:
              <select value={awayTeamId || ''} onChange={handleAwayTeamChange}>
                <option value="">Select a team</option>
                {teams
                  .filter((team) => team.id !== homeTeamId)
                  .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </label>
                {awayPlayers && awayPlayers.length > 0 && (
              <label>
                Player:
                <select value={awayPlayerId || ''} onChange={handleAwayPlayerChange}>
                  <option value="">Select a player</option>
                  {awayPlayers && awayPlayers.length > 0 && awayPlayers
                    .map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.full_name}
                      </option>
                    ))}
                </select>
              </label>
            )}
            {awayPlayer && (
              <div>
                <p>Player number: {awayPlayer.player_number}</p>
                <p>Player skill level: {awayPlayer.latest_skill_level}</p>
                <input 
                  type="checkbox" 
                  onChange={handleLagCheckboxChange} 
                  value={awayPlayerId ?? ''}
                  disabled={matchObject.lag_winner_id === homePlayerId}
                />
              </div>
            )}
          </form>
        </div>
      </div>
  )
}

export default MatchForm