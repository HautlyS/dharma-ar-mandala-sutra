
import { useState, useEffect } from 'react';
import { characters, TOTAL_CHARACTERS } from '@/data/characters';

export const useCharacterNavigation = () => {
  const [currentCharacterId, setCurrentCharacterId] = useState(1);
  
  const currentCharacter = characters.find(c => c.id === currentCharacterId) || characters[0];
  const progress = Math.round((currentCharacterId / TOTAL_CHARACTERS) * 100);
  
  const nextCharacter = () => {
    if (currentCharacterId < TOTAL_CHARACTERS) {
      setCurrentCharacterId(prev => prev + 1);
    }
  };
  
  const prevCharacter = () => {
    if (currentCharacterId > 1) {
      setCurrentCharacterId(prev => prev - 1);
    }
  };
  
  const goToCharacter = (id: number) => {
    if (id >= 1 && id <= TOTAL_CHARACTERS) {
      setCurrentCharacterId(id);
    }
  };

  return {
    currentCharacter,
    currentCharacterId,
    progress,
    nextCharacter,
    prevCharacter,
    goToCharacter,
    totalCharacters: TOTAL_CHARACTERS
  };
};
