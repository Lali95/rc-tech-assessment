import React from 'react';
import './style.css';  

interface HeroItemProps {
  id: number;
  name: string;
  isAvailable: boolean;
  toggleAvailability: (id: number) => void;
}

const HeroItem: React.FC<HeroItemProps> = ({ id, name, isAvailable, toggleAvailability }) => {
  return (
    <div
      onClick={() => toggleAvailability(id)}
      className={`hero-item ${isAvailable ? 'available' : ''}`}
    >
      {id}. {name} {isAvailable && `"Available"`}
    </div>
  );
};

export default HeroItem;
