
import { useState } from "react";

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

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error(`Error loading 3D model for ${characterName}`);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-white text-sm">Carregando modelo 3D...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <p className="text-sm">Erro ao carregar modelo</p>
          </div>
        </div>
      )}

      <model-viewer
        src={modelUrl}
        alt={`Modelo 3D de ${characterName}`}
        auto-rotate
        camera-controls
        loading="eager"
        reveal="auto"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent"
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default ModelViewer;
