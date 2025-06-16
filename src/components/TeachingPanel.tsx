
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dharma } from "lucide-react";

const TeachingPanel = () => {
  return (
    <Card className="bg-black/40 border-blue-500/30 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Dharma className="w-4 h-4 text-blue-400" />
          <h3 className="font-semibold text-blue-300">Ensinamento Atual</h3>
        </div>
        
        <h4 className="text-sm font-medium text-white mb-2">
          A Natureza da Sabedoria
        </h4>
        
        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          "Como o espaço infinito não tem obstáculos, assim a mente do bodhisattva 
          abraça todos os seres com compaixão ilimitada..."
        </p>
        
        <Button
          size="sm"
          className="w-full bg-blue-600/20 border border-blue-400/50 text-blue-300 hover:bg-blue-600/30"
        >
          Continuar Jornada →
        </Button>
      </div>
    </Card>
  );
};

export default TeachingPanel;
