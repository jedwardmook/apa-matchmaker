import { useState, useEffect } from 'react';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  player_number: number;
  latest_skill_level: number;
}
export function useTeamPlayers({id}: { id: number | undefined | null }) {
  const [players, setPlayers] = useState<Player[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) {
      setPlayers([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setPlayers(undefined);
    fetch(`http://127.0.0.1:3000/teams/${id}/players`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setPlayers(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, [id])

  return { players, loading, error };
}