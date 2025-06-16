
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";
import { useState } from "react";

const MeditationPanel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="bg-black/50 border-white/10 backdrop-blur-md">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Circle className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Meditação</h3>
            <p className="text-xs text-gray-400">5 min</p>
          </div>
        </div>
        
        <div className="bg-purple-900/30 rounded p-2 mb-3 border border-purple-500/20">
          <p className="text-xs text-purple-200 text-center font-sanskrit">
            Gate Gate Paragate
          </p>
        </div>
        
        <Button
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm"
        >
          {isPlaying ? "⏸ Pausar" : "▶ Iniciar"}
        </Button>
      </div>
    </Card>
  );
};

export default MeditationPanel;
