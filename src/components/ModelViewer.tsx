
import { useState, useEffect, useRef } from "react";

interface ModelViewerProps {
  modelUrl: string;
  characterName: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ModelViewer = ({ modelUrl, characterName }: ModelViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [arSupported, setArSupported] = useState(false);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    const checkARSupport = async () => {
      try {
        if (navigator.xr) {
          const supported = await navigator.xr.isSessionSupported('immersive-ar');
          setArSupported(supported);
        }
      } catch (error) {
        console.log('AR not supported:', error);
        setArSupported(false);
      }
    };

    checkARSupport();
  }, []);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      // Configurações do modelo
      modelViewer.src = modelUrl;
      modelViewer.style.backgroundColor = 'transparent';
      modelViewer.style.mixBlendMode = 'luminosity';
      
      // Event listeners
      const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
        console.log(`3D Model loaded successfully: ${characterName}`);
      };

      const handleError = (event: any) => {
        setIsLoading(false);
        setHasError(true);
        console.error(`Error loading 3D model for ${characterName}:`, event);
      };

      modelViewer.addEventListener('load', handleLoad);
      modelViewer.addEventListener('error', handleError);

      return () => {
        modelViewer.removeEventListener('load', handleLoad);
        modelViewer.removeEventListener('error', handleError);
      };
    }
  }, [modelUrl, characterName]);

  const startAR = async () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer && arSupported) {
      try {
        await modelViewer.activateAR();
      } catch (error) {
        console.error('AR activation failed:', error);
      }
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-cyan-300 text-sm font-mono">Carregando modelo 3D...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-center text-red-400">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-red-500/50">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <p className="text-sm font-mono">Erro ao carregar modelo 3D</p>
            <p className="text-xs text-red-300/70 font-mono mt-1">{characterName}</p>
          </div>
        </div>
      )}

      {/* AR Button */}
      {arSupported && !isLoading && !hasError && (
        <button
          onClick={startAR}
          className="absolute top-4 right-4 z-20 bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 px-3 py-1 rounded-lg text-xs font-mono hover:bg-cyan-500/40 backdrop-blur-sm"
        >
          AR MODE
        </button>
      )}

      {/* Model Viewer */}
      <model-viewer
        ref={modelViewerRef}
        alt={`Modelo 3D de ${characterName}`}
        camera-controls
        touch-action="pan-y"
        auto-rotate
        rotation-per-second="7deg"
        ar={arSupported}
        ar-modes="webxr scene-viewer quick-look"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent"
        }}
      />

      {/* Holographic Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default ModelViewer;
