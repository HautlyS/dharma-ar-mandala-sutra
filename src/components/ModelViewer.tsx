
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ModelViewerProps {
  modelUrl: string;
  characterName: string;
}

const ModelViewer = ({ modelUrl, characterName }: ModelViewerProps) => {
  const modelViewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load model-viewer script
  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => setHasError(true);
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Configure model viewer once script is loaded
  useEffect(() => {
    if (scriptLoaded && modelViewerRef.current && modelUrl) {
      const modelViewer = modelViewerRef.current;
      
      // Set the model source
      modelViewer.src = modelUrl;
      
      // Enhanced configuration
      modelViewer.alt = `Modelo 3D de ${characterName}`;
      modelViewer.cameraControls = true;
      modelViewer.touchAction = 'pan-y';
      modelViewer.autoRotate = true;
      modelViewer.rotationPerSecond = '7deg';
      modelViewer.interactionPrompt = 'auto';
      modelViewer.ar = true;
      modelViewer.arModes = 'webxr scene-viewer quick-look';
      modelViewer.loading = 'lazy';
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
      });

      modelViewer.addEventListener('error', (event: any) => {
        console.error(`3D Model error for ${characterName}:`, event.detail);
        setIsLoading(false);
        setHasError(true);
      });

      modelViewer.addEventListener('progress', (event: any) => {
        const progress = event.detail.totalProgress;
        if (progress < 1) {
          setIsLoading(true);
        }
      });

      // Touch and mouse interaction enhancements
      modelViewer.addEventListener('camera-change', () => {
        // Smooth camera transitions
        modelViewer.style.transition = 'transform 0.1s ease-out';
      });
    }
  }, [scriptLoaded, modelUrl, characterName]);

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
        <div className="text-center">
          <p className="text-red-400 font-mono text-sm">Erro ao carregar modelo 3D</p>
          <p className="text-xs text-gray-400 mt-1">{characterName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto mb-2" />
            <p className="text-xs text-cyan-400 font-mono">Carregando {characterName}...</p>
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
    </div>
  );
};

export default ModelViewer;
