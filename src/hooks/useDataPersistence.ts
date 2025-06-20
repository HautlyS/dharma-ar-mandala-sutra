import { useState, useEffect, useCallback } from 'react';

interface UserPreferences {
  theme: 'dark' | 'light' | 'auto';
  language: 'pt' | 'en' | 'es';
  autoRotateModels: boolean;
  showPerformanceInfo: boolean;
  enableAutoOptimization: boolean;
  modelQuality: 'low' | 'medium' | 'high';
  soundEnabled: boolean;
  animationsEnabled: boolean;
  reducedMotion: boolean;
}

interface UserProgress {
  visitedCharacters: number[];
  favoriteCharacters: number[];
  completedSections: string[];
  currentCharacter: number;
  totalTimeSpent: number;
  lastVisit: string;
  journeyStarted: string;
  achievements: string[];
  notes: Record<number, string>;
}

interface UserData {
  preferences: UserPreferences;
  progress: UserProgress;
  version: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  language: 'pt',
  autoRotateModels: true,
  showPerformanceInfo: false,
  enableAutoOptimization: true,
  modelQuality: 'high',
  soundEnabled: true,
  animationsEnabled: true,
  reducedMotion: false
};

const DEFAULT_PROGRESS: UserProgress = {
  visitedCharacters: [],
  favoriteCharacters: [],
  completedSections: [],
  currentCharacter: 1,
  totalTimeSpent: 0,
  lastVisit: new Date().toISOString(),
  journeyStarted: new Date().toISOString(),
  achievements: [],
  notes: {}
};

const STORAGE_KEY = 'techno-sutra-user-data';
const CURRENT_VERSION = '2.1.0';

export const useDataPersistence = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migrate old data if needed
        if (parsed.version !== CURRENT_VERSION) {
          return migrateUserData(parsed);
        }
        return parsed;
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
    
    return {
      preferences: DEFAULT_PREFERENCES,
      progress: DEFAULT_PROGRESS,
      version: CURRENT_VERSION
    };
  });

  // Save to localStorage whenever userData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  }, [userData]);

  // Update last visit time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setUserData(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          lastVisit: new Date().toISOString(),
          totalTimeSpent: prev.progress.totalTimeSpent + 60 // Add 1 minute
        }
      }));
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  // Preferences management
  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setUserData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates }
    }));
  }, []);

  // Progress management
  const visitCharacter = useCallback((characterId: number) => {
    setUserData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentCharacter: characterId,
        visitedCharacters: prev.progress.visitedCharacters.includes(characterId)
          ? prev.progress.visitedCharacters
          : [...prev.progress.visitedCharacters, characterId]
      }
    }));
  }, []);

  const toggleFavorite = useCallback((characterId: number) => {
    setUserData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        favoriteCharacters: prev.progress.favoriteCharacters.includes(characterId)
          ? prev.progress.favoriteCharacters.filter(id => id !== characterId)
          : [...prev.progress.favoriteCharacters, characterId]
      }
    }));
  }, []);

  const completeSection = useCallback((sectionId: string) => {
    setUserData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        completedSections: prev.progress.completedSections.includes(sectionId)
          ? prev.progress.completedSections
          : [...prev.progress.completedSections, sectionId]
      }
    }));
  }, []);

  const addAchievement = useCallback((achievementId: string) => {
    setUserData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        achievements: prev.progress.achievements.includes(achievementId)
          ? prev.progress.achievements
          : [...prev.progress.achievements, achievementId]
      }
    }));
  }, []);

  const addNote = useCallback((characterId: number, note: string) => {
    setUserData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        notes: { ...prev.progress.notes, [characterId]: note }
      }
    }));
  }, []);

  const removeNote = useCallback((characterId: number) => {
    setUserData(prev => {
      const newNotes = { ...prev.progress.notes };
      delete newNotes[characterId];
      return {
        ...prev,
        progress: {
          ...prev.progress,
          notes: newNotes
        }
      };
    });
  }, []);

  // Statistics
  const getStatistics = useCallback(() => {
    const { progress } = userData;
    const totalCharacters = 56; // Total number of characters
    
    return {
      visitedCount: progress.visitedCharacters.length,
      visitedPercentage: (progress.visitedCharacters.length / totalCharacters) * 100,
      favoriteCount: progress.favoriteCharacters.length,
      completedSections: progress.completedSections.length,
      totalTimeSpent: progress.totalTimeSpent,
      achievementCount: progress.achievements.length,
      notesCount: Object.keys(progress.notes).length,
      journeyDays: Math.floor(
        (new Date().getTime() - new Date(progress.journeyStarted).getTime()) / (1000 * 60 * 60 * 24)
      )
    };
  }, [userData]);

  // Export/Import functionality
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `techno-sutra-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [userData]);

  const importData = useCallback((file: File) => {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          const migratedData = migrateUserData(importedData);
          setUserData(migratedData);
          resolve(true);
        } catch (error) {
          console.error('Failed to import data:', error);
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  }, []);

  // Reset functionality
  const resetProgress = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      progress: DEFAULT_PROGRESS
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      preferences: DEFAULT_PREFERENCES
    }));
  }, []);

  const resetAll = useCallback(() => {
    setUserData({
      preferences: DEFAULT_PREFERENCES,
      progress: DEFAULT_PROGRESS,
      version: CURRENT_VERSION
    });
  }, []);

  return {
    // Data
    preferences: userData.preferences,
    progress: userData.progress,
    
    // Preferences
    updatePreferences,
    
    // Progress
    visitCharacter,
    toggleFavorite,
    completeSection,
    addAchievement,
    addNote,
    removeNote,
    
    // Statistics
    getStatistics,
    
    // Import/Export
    exportData,
    importData,
    
    // Reset
    resetProgress,
    resetPreferences,
    resetAll
  };
};

// Migration function for older data versions
function migrateUserData(oldData: any): UserData {
  const migrated: UserData = {
    preferences: { ...DEFAULT_PREFERENCES, ...oldData.preferences },
    progress: { ...DEFAULT_PROGRESS, ...oldData.progress },
    version: CURRENT_VERSION
  };

  // Add any specific migration logic here for different versions
  if (oldData.version === '1.0.0') {
    // Migrate from v1.0.0 to current
    if (oldData.currentCharacterId) {
      migrated.progress.currentCharacter = oldData.currentCharacterId;
    }
  }

  return migrated;
}
