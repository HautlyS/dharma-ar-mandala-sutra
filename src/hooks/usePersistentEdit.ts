
import { useState, useEffect } from "react";
import { characters } from "@/data/characters";

const STORAGE_KEY = "techno-sutra-character-edits";

export interface CharacterEdit {
  teaching?: string;
  location?: string;
}

export const usePersistentEdit = () => {
  const [edits, setEdits] = useState<Record<number, CharacterEdit>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedEdits = JSON.parse(stored);
        setEdits(parsedEdits);
        console.log("Loaded character edits:", parsedEdits);
      } catch (error) {
        console.error("Error loading stored edits:", error);
        setEdits({});
      }
    }
  }, []);

  const updateCharacterContent = (id: number, field: 'teaching' | 'location', value: string) => {
    setEdits(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      };
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      // Log the edit for debugging and persistence
      console.log(`Character ${id} ${field} updated:`, value);
      console.log("Full character data would be:");
      const character = characters.find(c => c.id === id);
      if (character) {
        console.log({
          ...character,
          [field]: value
        });
      }
      
      return updated;
    });
  };

  const getCharacterContent = (id: number, field: 'teaching' | 'location'): string => {
    const character = characters.find(c => c.id === id);
    return edits[id]?.[field] || character?.[field] || "";
  };

  return {
    updateCharacterContent,
    getCharacterContent,
    edits,
  };
};
