import { useState, useEffect, useCallback } from 'react';

interface CacheEntry {
  url: string;
  blob: Blob;
  timestamp: number;
  size: number;
}

interface ModelCacheStats {
  totalSize: number;
  entryCount: number;
  hitRate: number;
  hits: number;
  misses: number;
}

class ModelCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 100 * 1024 * 1024; // 100MB
  private maxAge = 24 * 60 * 60 * 1000; // 24 hours
  private stats = { hits: 0, misses: 0 };

  async get(url: string): Promise<string | null> {
    const entry = this.cache.get(url);
    
    if (entry && Date.now() - entry.timestamp < this.maxAge) {
      this.stats.hits++;
      return URL.createObjectURL(entry.blob);
    }
    
    this.stats.misses++;
    return null;
  }

  async set(url: string, blob: Blob): Promise<void> {
    const size = blob.size;
    
    // Clean up old entries if needed
    this.cleanup();
    
    // Check if we have space
    if (this.getTotalSize() + size > this.maxSize) {
      this.evictLRU(size);
    }
    
    this.cache.set(url, {
      url,
      blob,
      timestamp: Date.now(),
      size
    });
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.maxAge) {
        this.cache.delete(key);
      }
    }
  }

  private evictLRU(neededSize: number): void {
    const entries = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => a.timestamp - b.timestamp);
    
    let freedSize = 0;
    for (const [key, entry] of entries) {
      this.cache.delete(key);
      freedSize += entry.size;
      if (freedSize >= neededSize) break;
    }
  }

  private getTotalSize(): number {
    return Array.from(this.cache.values())
      .reduce((total, entry) => total + entry.size, 0);
  }

  getStats(): ModelCacheStats {
    return {
      totalSize: this.getTotalSize(),
      entryCount: this.cache.size,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
      hits: this.stats.hits,
      misses: this.stats.misses
    };
  }

  clear(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0 };
  }
}

const modelCache = new ModelCache();

export const useModelCache = () => {
  const [stats, setStats] = useState<ModelCacheStats>(modelCache.getStats());

  const loadModel = useCallback(async (url: string): Promise<string> => {
    // Try cache first
    const cachedUrl = await modelCache.get(url);
    if (cachedUrl) {
      setStats(modelCache.getStats());
      return cachedUrl;
    }

    // Fetch and cache
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      await modelCache.set(url, blob);
      
      const objectUrl = URL.createObjectURL(blob);
      setStats(modelCache.getStats());
      return objectUrl;
    } catch (error) {
      console.error('Failed to load model:', error);
      throw error;
    }
  }, []);

  const preloadModel = useCallback(async (url: string): Promise<void> => {
    try {
      await loadModel(url);
    } catch (error) {
      console.warn('Failed to preload model:', url, error);
    }
  }, [loadModel]);

  const clearCache = useCallback(() => {
    modelCache.clear();
    setStats(modelCache.getStats());
  }, []);

  return {
    loadModel,
    preloadModel,
    clearCache,
    stats
  };
};
