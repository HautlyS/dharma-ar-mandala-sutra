
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

const TeachingPanel = () => {
  return (
    <Card className="bg-black/50 border-white/10 backdrop-blur-md">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Compass className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Ensinamento</h3>
            <p className="text-xs text-gray-400">Atual</p>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-white mb-2">
          A Natureza da Sabedoria
        </h4>
        
        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          "Como o espaço infinito não tem obstáculos, assim a mente do bodhisattva 
          abraça todos os seres..."
        </p>
        
        <Button
          size="sm"
          className="w-full bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 backdrop-blur-sm"
        >
          Continuar →
        </Button>
      </div>
    </Card>
  );
};

export default TeachingPanel;
