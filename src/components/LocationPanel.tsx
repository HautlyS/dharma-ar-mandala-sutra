
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LocationPanel = () => {
  return (
    <Card className="bg-black/50 border-white/10 backdrop-blur-md">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 text-xs">📍</span>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Local Sagrado</h3>
            <p className="text-xs text-gray-400">Nascente</p>
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-white mb-2">
          Águas Radioativas
        </h4>
        
        <p className="text-xs text-gray-300 mb-3">
          Águas que purificam corpo e mente segundo os ensinamentos ancestrais
        </p>
        
        <Badge variant="outline" className="border-green-400/50 text-green-300 text-xs bg-green-500/10">
          GPS Ativo
        </Badge>
      </div>
    </Card>
  );
};

export default LocationPanel;
