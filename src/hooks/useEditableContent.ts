
import { useState, useEffect } from "react";
import { Character, EditableContent } from "@/types/Character";

const STORAGE_KEY = "techno-sutra-editable-content";

export const useEditableContent = (characterId: number) => {
  const [editableContent, setEditableContent] = useState<Record<number, EditableContent>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setEditableContent(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading stored content:", error);
      }
    }
  }, []);

  const updateContent = (id: number, field: keyof EditableContent, value: string) => {
    setEditableContent(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getContent = (id: number, field: keyof EditableContent, defaultValue: string) => {
    return editableContent[id]?.[field] || defaultValue;
  };

  return {
    updateContent,
    getContent,
  };
};
