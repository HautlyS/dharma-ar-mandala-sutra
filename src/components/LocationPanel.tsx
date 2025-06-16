
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LocationPanel = () => {
  return (
    <Card className="bg-black/40 border-green-500/30 backdrop-blur-sm">
      <div className="p-4">
        <h3 className="font-semibold text-green-300 mb-3">Localização Sagrada</h3>
        
        <h4 className="text-sm font-medium text-white mb-2">
          Nascente Radioativa
        </h4>
        
        <p className="text-xs text-gray-300 mb-3">
          Águas que purificam corpo e mente segundo os ensinamentos ancestrais
        </p>
        
        <Badge variant="outline" className="border-green-400/50 text-green-300 text-xs">
          📍 GPS Integrado
        </Badge>
      </div>
    </Card>
  );
};

export default LocationPanel;
