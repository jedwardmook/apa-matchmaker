import { useState } from 'react';
import { useTeams } from '../hooks/useTeams';
import { usePlayer } from '../hooks/usePlayer';
import { useTeamPlayers } from '../hooks/useTeamPlayers';

interface SkillLevelFormProps {
  setSelectedForm: React.Dispatch<React.SetStateAction<string | null>>;
}

const SkillLevelForm = ({setSelectedForm}: SkillLevelFormProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [newSkillLevel, setNewSkillLevel] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);  
  const { teams } = useTeams();
  const { players } = useTeamPlayers({ id: selectedTeamId });
  const { player } = usePlayer({ id: selectedPlayerId });

  const possibleSkillLevels = [1, 2, 3, 4, 5, 6, 7];

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
    setSelectedTeamId(null); // Reset selected team ID when changing team
    setSelectedTeamId(teams.find(team => team.team_name === event.target.value)?.id || null);
  };

  const handlePlayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayer(event.target.value);
    setSelectedPlayerId(null); // Reset selected player ID when changing player
    setSelectedPlayerId(players?.find(player => player.full_name === event.target.value)?.id || null);
  }

  const onSubmitSkillLevelForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const payload = {
      player_skill_level: {
      player_id: selectedPlayerId,
      skill_level: parseInt(newSkillLevel || '3', 10),
      match_id: 0,
      },
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/player_skill_levels", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessage((data.error || player?.full_name + "'s skill level updated to " + newSkillLevel));
      setSelectedPlayerId(selectedPlayerId || null);
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Network error: " + error.message);
      } else {
        setMessage("Network error: An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <button onClick={() => setSelectedForm(null)}>Return</button>
        <form onSubmit={onSubmitSkillLevelForm}>
          <label>
            Team:
            <select onChange={handleTeamChange} value={selectedTeam || ''}>
              <option value="">Select a team</option>
              {teams.length > 0 && teams.map((team) => (
                  <option key={team.id} value={team.team_name}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </label>
            {players && players.length > 0 &&
              <label>
                Player:
                <select value={selectedPlayer || ''} onChange={handlePlayerChange}>
                  <option value="">Select a player</option>
                  {players && players.map((player) => (
                    <option key={player.id} value={player.full_name}>
                      {player.full_name}
                    </option>
                  ))}
                </select>
              </label>
            }
            {selectedPlayer && (
              <>
              <label>
                Current Skill Level: {player?.latest_skill_level || ''}
              </label>
              <label>
                New Skill Level:
                <select onChange={(e) => setNewSkillLevel(e.target.value)} value={newSkillLevel || ''}>
                  <option value=""> </option>
                  {possibleSkillLevels
                    .filter((level) => level !== player?.latest_skill_level)
                    .map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Update</button>
              </>
            )}
          </form>
          {message && <p>{message}</p>}
    </div>
  )
}

export default SkillLevelForm