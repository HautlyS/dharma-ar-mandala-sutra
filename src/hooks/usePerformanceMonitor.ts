import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  fps: number;
  isLowPerformance: boolean;
}

interface PerformanceConfig {
  enableMonitoring: boolean;
  fpsThreshold: number;
  memoryThreshold: number;
  sampleInterval: number;
}

const defaultConfig: PerformanceConfig = {
  enableMonitoring: true,
  fpsThreshold: 30,
  memoryThreshold: 100 * 1024 * 1024, // 100MB
  sampleInterval: 1000 // 1 second
};

export const usePerformanceMonitor = (config: Partial<PerformanceConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config };
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 60,
    isLowPerformance: false
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef<number>();

  // FPS monitoring
  const measureFPS = useCallback(() => {
    if (!finalConfig.enableMonitoring) return;

    const now = performance.now();
    frameCount.current++;

    if (now - lastTime.current >= finalConfig.sampleInterval) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      
      setMetrics(prev => ({
        ...prev,
        fps,
        isLowPerformance: fps < finalConfig.fpsThreshold
      }));

      frameCount.current = 0;
      lastTime.current = now;
    }

    animationFrame.current = requestAnimationFrame(measureFPS);
  }, [finalConfig.enableMonitoring, finalConfig.sampleInterval, finalConfig.fpsThreshold]);

  // Memory monitoring
  const measureMemory = useCallback(() => {
    if (!finalConfig.enableMonitoring) return;

    // @ts-ignore - performance.memory is not in all browsers
    if (performance.memory) {
      // @ts-ignore
      const memoryUsage = performance.memory.usedJSHeapSize;
      
      setMetrics(prev => ({
        ...prev,
        memoryUsage,
        isLowPerformance: prev.isLowPerformance || memoryUsage > finalConfig.memoryThreshold
      }));
    }
  }, [finalConfig.enableMonitoring, finalConfig.memoryThreshold]);

  // Load time measurement
  const measureLoadTime = useCallback((startTime: number) => {
    const loadTime = performance.now() - startTime;
    setMetrics(prev => ({ ...prev, loadTime }));
    return loadTime;
  }, []);

  // Render time measurement
  const measureRenderTime = useCallback(() => {
    const startTime = performance.now();
    return () => {
      const renderTime = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, renderTime }));
      return renderTime;
    };
  }, []);

  // Performance optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = [];

    if (metrics.fps < 30) {
      suggestions.push('Considere reduzir a qualidade dos modelos 3D');
      suggestions.push('Desative efeitos visuais desnecessários');
    }

    if (metrics.memoryUsage > 50 * 1024 * 1024) { // 50MB
      suggestions.push('Limpe o cache de modelos periodicamente');
      suggestions.push('Reduza o número de modelos carregados simultaneamente');
    }

    if (metrics.loadTime > 5000) { // 5 seconds
      suggestions.push('Verifique sua conexão com a internet');
      suggestions.push('Use modelos com menor resolução');
    }

    return suggestions;
  }, [metrics]);

  // Auto-optimization based on performance
  const getAutoOptimizationSettings = useCallback(() => {
    const settings = {
      modelQuality: 'high' as 'low' | 'medium' | 'high',
      enableAnimations: true,
      enableShadows: true,
      enableReflections: true,
      maxConcurrentModels: 3
    };

    if (metrics.isLowPerformance) {
      settings.modelQuality = metrics.fps < 20 ? 'low' : 'medium';
      settings.enableAnimations = metrics.fps > 25;
      settings.enableShadows = metrics.fps > 30;
      settings.enableReflections = metrics.fps > 35;
      settings.maxConcurrentModels = metrics.fps < 20 ? 1 : 2;
    }

    return settings;
  }, [metrics]);

  // Start monitoring
  useEffect(() => {
    if (finalConfig.enableMonitoring) {
      measureFPS();
      
      const memoryInterval = setInterval(measureMemory, finalConfig.sampleInterval);
      
      return () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        clearInterval(memoryInterval);
      };
    }
  }, [finalConfig.enableMonitoring, measureFPS, measureMemory, finalConfig.sampleInterval]);

  // Performance grade calculation
  const getPerformanceGrade = useCallback(() => {
    let score = 100;

    // FPS penalty
    if (metrics.fps < 60) score -= (60 - metrics.fps) * 1.5;
    if (metrics.fps < 30) score -= 20;
    if (metrics.fps < 15) score -= 30;

    // Memory penalty
    const memoryMB = metrics.memoryUsage / (1024 * 1024);
    if (memoryMB > 100) score -= (memoryMB - 100) * 0.5;
    if (memoryMB > 200) score -= 20;

    // Load time penalty
    if (metrics.loadTime > 3000) score -= (metrics.loadTime - 3000) / 100;
    if (metrics.loadTime > 10000) score -= 20;

    score = Math.max(0, Math.min(100, score));

    if (score >= 90) return { grade: 'A', color: 'green', description: 'Excelente' };
    if (score >= 80) return { grade: 'B', color: 'blue', description: 'Bom' };
    if (score >= 70) return { grade: 'C', color: 'yellow', description: 'Regular' };
    if (score >= 60) return { grade: 'D', color: 'orange', description: 'Ruim' };
    return { grade: 'F', color: 'red', description: 'Crítico' };
  }, [metrics]);

  return {
    metrics,
    measureLoadTime,
    measureRenderTime,
    getOptimizationSuggestions,
    getAutoOptimizationSettings,
    getPerformanceGrade,
    isMonitoring: finalConfig.enableMonitoring
  };
};

// Hook for component-specific performance monitoring
export const useComponentPerformance = (componentName: string) => {
  const [renderCount, setRenderCount] = useState(0);
  const [lastRenderTime, setLastRenderTime] = useState(0);
  const mountTime = useRef(performance.now());

  useEffect(() => {
    const renderStart = performance.now();
    setRenderCount(prev => prev + 1);
    
    return () => {
      const renderTime = performance.now() - renderStart;
      setLastRenderTime(renderTime);
      
      if (renderTime > 16.67) { // More than one frame at 60fps
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  const getComponentStats = useCallback(() => {
    const uptime = performance.now() - mountTime.current;
    const avgRenderTime = lastRenderTime;
    
    return {
      componentName,
      renderCount,
      lastRenderTime,
      uptime,
      avgRenderTime,
      isHealthy: avgRenderTime < 16.67 && renderCount > 0
    };
  }, [componentName, renderCount, lastRenderTime]);

  return {
    renderCount,
    lastRenderTime,
    getComponentStats
  };
};
