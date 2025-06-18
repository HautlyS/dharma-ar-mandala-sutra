
import { useState, useEffect } from 'react';
import { Character } from '@/data/characters';

export const usePersistentEdit = (characterId: number, field: 'teaching' | 'locationDescription') => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const storageKey = `character_${characterId}_${field}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setValue(stored);
    }
  }, [characterId, field]);

  const handleSave = (newValue: string) => {
    const storageKey = `character_${characterId}_${field}`;
    localStorage.setItem(storageKey, newValue);
    setValue(newValue);
    setIsEditing(false);
  };

  const getStoredValue = () => {
    const storageKey = `character_${characterId}_${field}`;
    return localStorage.getItem(storageKey) || '';
  };

  return {
    isEditing,
    setIsEditing,
    value: getStoredValue() || value,
    handleSave
  };
};
