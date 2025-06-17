
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
    if (modelViewer && modelUrl) {
      setIsLoading(true);
      setHasError(false);
      
      // Set model source directly
      modelViewer.src = modelUrl;
      
      // Apply cyberpunk styling
      modelViewer.style.width = "100%";
      modelViewer.style.height = "100%";
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
        if (modelViewer) {
          modelViewer.removeEventListener('load', handleLoad);
          modelViewer.removeEventListener('error', handleError);
        }
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
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cyan-300 text-sm font-mono">CARREGANDO MODELO 3D...</p>
            <p className="text-cyan-500/60 text-xs font-mono mt-1">{characterName}</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
          <div className="text-center text-red-400">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/50">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <p className="text-sm font-mono">ERRO AO CARREGAR MODELO 3D</p>
            <p className="text-xs text-red-300/70 font-mono mt-1">{characterName}</p>
          </div>
        </div>
      )}

      {/* AR Button */}
      {arSupported && !isLoading && !hasError && (
        <button
          onClick={startAR}
          className="absolute top-4 right-4 z-30 bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 px-4 py-2 rounded-lg text-xs font-mono hover:bg-cyan-500/40 backdrop-blur-sm transition-all duration-300"
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
      />

      {/* Cyberpunk Overlay Effects */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default ModelViewer;
