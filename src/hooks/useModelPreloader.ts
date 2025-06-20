import { useEffect, useCallback } from 'react';
import { characters } from '@/data/characters';
import { useModelCache } from './useModelCache';

interface PreloadOptions {
  preloadNext?: number;
  preloadPrevious?: number;
  preloadPopular?: boolean;
  priority?: 'high' | 'low';
}

export const useModelPreloader = (currentCharacterId: number, options: PreloadOptions = {}) => {
  const { preloadModel } = useModelCache();
  const {
    preloadNext = 2,
    preloadPrevious = 1,
    preloadPopular = true,
    priority = 'low'
  } = options;

  // Get popular models (those with glbStatus: true)
  const popularModels = characters
    .filter(char => char.glbStatus)
    .slice(0, 5)
    .map(char => char.modelUrl);

  const preloadAdjacentModels = useCallback(async () => {
    const preloadPromises: Promise<void>[] = [];

    // Preload next models
    for (let i = 1; i <= preloadNext; i++) {
      const nextId = currentCharacterId + i;
      const nextChar = characters.find(c => c.id === nextId);
      if (nextChar && nextChar.glbStatus) {
        preloadPromises.push(preloadModel(nextChar.modelUrl));
      }
    }

    // Preload previous models
    for (let i = 1; i <= preloadPrevious; i++) {
      const prevId = currentCharacterId - i;
      const prevChar = characters.find(c => c.id === prevId);
      if (prevChar && prevChar.glbStatus) {
        preloadPromises.push(preloadModel(prevChar.modelUrl));
      }
    }

    // Preload popular models if enabled
    if (preloadPopular) {
      popularModels.forEach(url => {
        preloadPromises.push(preloadModel(url));
      });
    }

    // Execute preloading with appropriate priority
    if (priority === 'high') {
      await Promise.all(preloadPromises);
    } else {
      // Low priority: preload in background without blocking
      Promise.all(preloadPromises).catch(console.warn);
    }
  }, [currentCharacterId, preloadNext, preloadPrevious, preloadPopular, priority, preloadModel, popularModels]);

  // Preload on character change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      preloadAdjacentModels();
    }, 500); // Debounce to avoid excessive preloading

    return () => clearTimeout(timeoutId);
  }, [preloadAdjacentModels]);

  return {
    preloadAdjacentModels,
    popularModels
  };
};
