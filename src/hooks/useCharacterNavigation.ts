
import { useState, useEffect } from "react";
import { characters } from "@/data/characters";
import { Character } from "@/types/Character";

export const useCharacterNavigation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visitedCharacters, setVisitedCharacters] = useState<Set<number>>(new Set([1]));

  const currentCharacter = characters[currentIndex];
  const totalCharacters = characters.length;

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? totalCharacters - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setVisitedCharacters(prev => new Set([...prev, characters[prevIndex].id]));
  };

  const goToNext = () => {
    const nextIndex = currentIndex === totalCharacters - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    setVisitedCharacters(prev => new Set([...prev, characters[nextIndex].id]));
  };

  const goToCharacter = (id: number) => {
    const index = characters.findIndex(char => char.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      setVisitedCharacters(prev => new Set([...prev, id]));
    }
  };

  const progress = (visitedCharacters.size / totalCharacters) * 100;

  return {
    currentCharacter,
    currentIndex,
    totalCharacters,
    goToPrevious,
    goToNext,
    goToCharacter,
    visitedCharacters,
    progress,
  };
};
