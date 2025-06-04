import { useState, useEffect } from 'react';

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  player_number: number;
  latest_skill_level: number;
  full_name: string;
}

export function usePlayer({ id }: { id: number | undefined | null }) {
  const [player, setPlayer] = useState<Player | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPlayer(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setPlayer(undefined);
    fetch(`http://127.0.0.1:3000/players/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPlayer(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  return { player, loading, error };
}