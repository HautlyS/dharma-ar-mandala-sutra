
import { useState, useEffect } from "react";

const STORAGE_KEY = "techno-sutra-editable-content";

export interface EditableContent {
  teaching?: string;
  location?: string;
  mapUrl?: string;
}

export const useEditableContent = (characterId: number) => {
  const [editableContent, setEditableContent] = useState<Record<number, EditableContent>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedContent = JSON.parse(stored);
        setEditableContent(parsedContent);
        console.log(`Loaded editable content for character ${characterId}:`, parsedContent[characterId]);
      } catch (error) {
        console.error("Error loading stored content:", error);
        setEditableContent({});
      }
    }
  }, [characterId]);

  const updateContent = (id: number, field: keyof EditableContent, value: string) => {
    setEditableContent(prev => {
      const updated = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      };
      
      // Save to localStorage immediately
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      // Log for debugging and simulated persistence
      console.log(`Content updated for character ${id}, field ${field}:`, value);
      console.log(`Full content for character ${id}:`, updated[id]);
      
      return updated;
    });
  };

  const getContent = (id: number, field: keyof EditableContent, defaultValue: string) => {
    const content = editableContent[id]?.[field];
    return content || defaultValue;
  };

  const getAllContentForCharacter = (id: number) => {
    return editableContent[id] || {};
  };

  return {
    updateContent,
    getContent,
    getAllContentForCharacter,
    editableContent,
  };
};
