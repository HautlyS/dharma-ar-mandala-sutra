
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import EditableText from "./EditableText";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useEditableContent } from "@/hooks/useEditableContent";

const LocationPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateContent, getContent } = useEditableContent(currentCharacter.id);

  const location = getContent(currentCharacter.id, 'location', currentCharacter.location || '');
  const mapUrl = getContent(currentCharacter.id, 'mapUrl', '');

  const handleMapClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
    } else {
      // Default search for the location
      const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
      window.open(searchUrl, '_blank');
    }
  };

  return (
    <Card className="bg-black/50 border-white/10 backdrop-blur-md">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm">Local Sagrado</h3>
            <p className="text-xs text-gray-400">Nascente</p>
          </div>
        </div>
        
        <div className="mb-3">
          <EditableText
            text={location}
            onSave={(newText) => updateContent(currentCharacter.id, 'location', newText)}
            className="text-sm font-medium text-white mb-2"
          />
        </div>
        
        <p className="text-xs text-gray-300 mb-3">
          Local sagrado associado ao mestre {currentCharacter.name}
        </p>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleMapClick}
            className="flex-1 bg-green-500/20 border border-green-400/50 text-green-300 hover:bg-green-500/30 text-xs"
          >
            Abrir Mapa
          </Button>
          <div className="group relative">
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 bg-white/10 hover:bg-white/20"
              onClick={() => {
                const newUrl = prompt('URL do Google Maps:', mapUrl);
                if (newUrl !== null) {
                  updateContent(currentCharacter.id, 'mapUrl', newUrl);
                }
              }}
            >
              <span className="text-xs">✏</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationPanel;
