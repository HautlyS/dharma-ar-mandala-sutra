
import { useEffect, useRef } from 'react';

interface ModelViewerProps {
  modelUrl: string;
  characterName: string;
}

const ModelViewer = ({ modelUrl, characterName }: ModelViewerProps) => {
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Load the model-viewer script if not already loaded
    if (!window.customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (modelViewerRef.current && modelUrl) {
      const modelViewer = modelViewerRef.current;
      
      // Set the model source
      modelViewer.src = modelUrl;
      
      // Configure AR settings
      modelViewer.ar = true;
      modelViewer.arModes = 'webxr scene-viewer quick-look';
      modelViewer.style.backgroundColor = 'transparent';
      modelViewer.style.mixBlendMode = 'normal';
      
      // Add event listeners
      modelViewer.addEventListener('load', () => {
        console.log(`Model loaded: ${characterName}`);
      });

      modelViewer.addEventListener('error', (event: any) => {
        console.error(`Model error for ${characterName}:`, event.detail);
      });
    }
  }, [modelUrl, characterName]);

  return (
    <div className="w-full h-full relative">
      <model-viewer
        ref={modelViewerRef}
        alt={`Modelo 3D de ${characterName}`}
        camera-controls
        touch-action="pan-y"
        auto-rotate
        rotation-per-second="7deg"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          opacity: 0.8
        }}
        loading="eager"
        reveal="auto"
      />
      
      {/* AR Button */}
      <button
        slot="ar-button"
        className="absolute bottom-4 right-4 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono hover:bg-cyan-500/30 transition-colors backdrop-blur-sm"
      >
        AR MODE
      </button>
    </div>
  );
};

export default ModelViewer;
