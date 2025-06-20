
import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader2, AlertTriangle, RotateCcw, Gauge, Settings } from 'lucide-react';
import { useModelCache } from '@/hooks/useModelCache';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { ModelErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ModelViewerProps {
  modelUrl: string;
  characterName: string;
  priority?: 'high' | 'low';
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: Error) => void;
  showPerformanceInfo?: boolean;
  enableAutoOptimization?: boolean;
  quality?: 'low' | 'medium' | 'high';
}

const ModelViewer = ({
  modelUrl,
  characterName,
  priority = 'low',
  onLoadStart,
  onLoadComplete,
  onError,
  showPerformanceInfo = false,
  enableAutoOptimization = true,
  quality = 'high'
}: ModelViewerProps) => {
  const modelViewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [cachedModelUrl, setCachedModelUrl] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);

  const { loadModel, stats } = useModelCache();
  const {
    metrics,
    measureLoadTime,
    getAutoOptimizationSettings,
    getPerformanceGrade
  } = usePerformanceMonitor({
    enableMonitoring: showPerformanceInfo || enableAutoOptimization
  });

  // Get optimized settings based on performance
  const optimizedSettings = enableAutoOptimization ? getAutoOptimizationSettings() : null;

  // Load cached model with performance monitoring
  const loadCachedModel = useCallback(async () => {
    if (!modelUrl) return;

    const startTime = performance.now();

    try {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage('');
      onLoadStart?.();

      const cachedUrl = await loadModel(modelUrl);
      setCachedModelUrl(cachedUrl);

      // Measure load time
      measureLoadTime(startTime);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to load model';
      setErrorMessage(errorMsg);
      setHasError(true);
      onError?.(error instanceof Error ? error : new Error(errorMsg));
    }
  }, [modelUrl, loadModel, onLoadStart, onError, measureLoadTime]);

  // Load model-viewer script
  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => {
        setHasError(true);
        setErrorMessage('Failed to load 3D viewer');
      };
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Load model when URL changes
  useEffect(() => {
    if (modelUrl) {
      loadCachedModel();
    }
  }, [modelUrl, loadCachedModel]);

  // Configure model viewer once script is loaded
  useEffect(() => {
    if (scriptLoaded && modelViewerRef.current && cachedModelUrl) {
      const modelViewer = modelViewerRef.current;

      // Set the cached model source
      modelViewer.src = cachedModelUrl;
      
      // Enhanced configuration with performance optimization
      modelViewer.alt = `Modelo 3D de ${characterName}`;
      modelViewer.cameraControls = true;
      modelViewer.touchAction = 'pan-y';

      // Apply performance-based settings
      if (optimizedSettings) {
        modelViewer.autoRotate = optimizedSettings.enableAnimations;
        modelViewer.rotationPerSecond = optimizedSettings.enableAnimations ? '7deg' : '0deg';
        modelViewer.shadowIntensity = optimizedSettings.enableShadows ? '0.3' : '0';
        modelViewer.environmentImage = optimizedSettings.enableReflections ? 'neutral' : 'none';
      } else {
        modelViewer.autoRotate = true;
        modelViewer.rotationPerSecond = '7deg';
        modelViewer.shadowIntensity = '0.3';
        modelViewer.environmentImage = 'neutral';
      }

      modelViewer.interactionPrompt = 'auto';
      modelViewer.ar = true;
      modelViewer.arModes = 'webxr scene-viewer quick-look';
      modelViewer.loading = priority === 'high' ? 'eager' : 'lazy';
      modelViewer.reveal = 'interaction';
      
      // Enhanced camera controls
      modelViewer.cameraOrbit = '0deg 75deg 105%';
      modelViewer.minCameraOrbit = 'auto 0deg auto';
      modelViewer.maxCameraOrbit = 'auto 160deg auto';
      modelViewer.minFieldOfView = '25deg';
      modelViewer.maxFieldOfView = '45deg';
      
      // Environment and lighting
      modelViewer.environmentImage = 'neutral';
      modelViewer.shadowIntensity = '0.3';
      modelViewer.exposure = '1';
      
      // Performance optimizations
      modelViewer.poster = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48dGV4dCB4PSI1MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMwMGZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==';
      
      // Event listeners
      modelViewer.addEventListener('load', () => {
        console.log(`3D Model loaded: ${characterName}`);
        setIsLoading(false);
        setHasError(false);
        setLoadProgress(100);
        onLoadComplete?.();
      });

      modelViewer.addEventListener('error', (event: any) => {
        const errorMsg = `3D Model error for ${characterName}: ${event.detail?.message || 'Unknown error'}`;
        console.error(errorMsg, event.detail);
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(errorMsg);
        onError?.(new Error(errorMsg));
      });

      modelViewer.addEventListener('progress', (event: any) => {
        const progress = Math.round(event.detail.totalProgress * 100);
        setLoadProgress(progress);
        if (progress < 100) {
          setIsLoading(true);
        }
      });

      // Touch and mouse interaction enhancements
      modelViewer.addEventListener('camera-change', () => {
        // Smooth camera transitions
        modelViewer.style.transition = 'transform 0.1s ease-out';
      });

      // Performance monitoring
      modelViewer.addEventListener('model-visibility', (event: any) => {
        if (event.detail.visible) {
          console.log(`Model ${characterName} is now visible`);
        }
      });
    }
  }, [scriptLoaded, cachedModelUrl, characterName, onLoadComplete, onError]);

  const retryLoad = useCallback(() => {
    setHasError(false);
    setErrorMessage('');
    setLoadProgress(0);
    loadCachedModel();
  }, [loadCachedModel]);

  if (!scriptLoaded && !hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mx-auto mb-2" />
          <p className="text-xs text-cyan-400 font-mono">Carregando visualizador 3D...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-lg border border-red-500/30">
        <div className="text-center p-4">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-400 font-mono text-sm mb-1">Erro ao carregar modelo 3D</p>
          <p className="text-xs text-gray-400 mb-3">{characterName}</p>
          {errorMessage && (
            <p className="text-xs text-red-300 mb-3 font-mono">{errorMessage}</p>
          )}
          <Button
            size="sm"
            onClick={retryLoad}
            className="bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30 font-mono"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            TENTAR NOVAMENTE
          </Button>
        </div>
      </div>
    );
  }

  const performanceGrade = getPerformanceGrade();

  return (
    <ModelErrorBoundary modelName={characterName}>
      <div className="w-full h-full relative">
        {/* Enhanced Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-cyan-400 font-mono mb-2">Carregando {characterName}...</p>
              <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 font-mono mt-1">{loadProgress}%</p>
              {stats.hitRate > 0 && (
                <p className="text-xs text-green-400 font-mono mt-1">
                  Cache: {Math.round(stats.hitRate * 100)}% hit rate
                </p>
              )}
              {optimizedSettings && (
                <p className="text-xs text-yellow-400 font-mono mt-1">
                  Modo otimizado: {optimizedSettings.modelQuality}
                </p>
              )}
            </div>
          </div>
        )}
      
      {/* Model Viewer */}
      <model-viewer
        ref={modelViewerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          opacity: isLoading ? 0.3 : 0.8,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {/* Enhanced AR Button */}
      <button
        slot="ar-button"
        className="absolute bottom-4 right-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono hover:from-cyan-500/30 hover:to-purple-500/30 transition-all backdrop-blur-sm shadow-lg"
      >
        AR MODE
      </button>
      
      {/* Control Instructions */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-cyan-500/30">
        <p className="text-xs text-cyan-400 font-mono">🖱️ Clique e arraste para orbitar</p>
        <p className="text-xs text-gray-400 font-mono">📱 Toque e arraste no mobile</p>
        <p className="text-xs text-gray-400 font-mono">🔍 Scroll para zoom</p>
      </div>

      {/* Performance Info */}
      {showPerformanceInfo && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 border border-cyan-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-3 h-3 text-cyan-400" />
            <Badge className={`text-xs bg-${performanceGrade.color}-500/20 text-${performanceGrade.color}-300 border-${performanceGrade.color}-400/50`}>
              {performanceGrade.grade}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 font-mono">FPS: {metrics.fps}</p>
          <p className="text-xs text-gray-400 font-mono">
            Mem: {Math.round(metrics.memoryUsage / 1024 / 1024)}MB
          </p>
          {metrics.loadTime > 0 && (
            <p className="text-xs text-gray-400 font-mono">
              Load: {Math.round(metrics.loadTime)}ms
            </p>
          )}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute bottom-16 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30 min-w-48">
          <h4 className="text-sm font-mono text-cyan-400 mb-2">Configurações 3D</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Qualidade:</span>
              <span className="text-white">{quality}</span>
            </div>
            {optimizedSettings && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Auto-otimização:</span>
                  <span className="text-green-400">Ativa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Animações:</span>
                  <span className={optimizedSettings.enableAnimations ? "text-green-400" : "text-red-400"}>
                    {optimizedSettings.enableAnimations ? "On" : "Off"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sombras:</span>
                  <span className={optimizedSettings.enableShadows ? "text-green-400" : "text-red-400"}>
                    {optimizedSettings.enableShadows ? "On" : "Off"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Settings Toggle */}
      {(showPerformanceInfo || enableAutoOptimization) && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowSettings(!showSettings)}
          className="absolute bottom-4 left-4 w-8 h-8 p-0 text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/20"
        >
          <Settings className="w-4 h-4" />
        </Button>
      )}
    </div>
  </ModelErrorBoundary>
);
};

export default ModelViewer;
