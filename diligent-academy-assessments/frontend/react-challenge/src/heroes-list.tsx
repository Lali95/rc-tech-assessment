import React, { useEffect, useState } from 'react';
import HeroItem from './HeroItem';
import { callApi } from './call-api';
import './style.css'; 


interface Hero {
  id: number;
  name: string;
  available: boolean;
}

function HeroesList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await callApi<Hero[]>('heroes');
              setHeroes(data);
      } catch (err) {
              setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  const toggleAvailability = (id: number) => {
    setHeroes(prevHeroes =>
      prevHeroes.map(hero =>
        hero.id === id ? { ...hero, available: !hero.available } : hero
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch heroes.</p>;

  return (
    <>
      <h2>Heroes</h2>
      <div className="hero-list">
        {heroes.map(hero => (
          <HeroItem
            key={hero.id}
            id={hero.id}
            name={hero.name}
            isAvailable={hero.available}
            toggleAvailability={toggleAvailability}
          />
        ))}
      </div>
    </>
  );
}

export default HeroesList;
