
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";
import { useState } from "react";

const MeditationPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Circle className="w-4 h-4 text-purple-400 animate-pulse" />
          <h3 className="font-semibold text-purple-300">Prática Meditativa</h3>
        </div>
        
        <p className="text-xs text-gray-300 mb-2">
          Meditação guiada de 5 minutos
        </p>
        
        <div className="bg-purple-900/30 rounded p-2 mb-3">
          <p className="text-xs text-purple-200 text-center font-sanskrit">
            Gate Gate Paragate Parasamgate
          </p>
        </div>
        
        <Button
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full bg-purple-600/20 border border-purple-400/50 text-purple-300 hover:bg-purple-600/30"
        >
          {isPlaying ? "⏸ Pausar" : "▶ Iniciar"} Contemplação
        </Button>
      </div>
    </Card>
  );
};

export default MeditationPanel;
