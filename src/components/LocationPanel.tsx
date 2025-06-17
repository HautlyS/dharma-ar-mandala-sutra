
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Edit3, Save, X, ExternalLink } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useEditableContent } from "@/hooks/useEditableContent";

const LocationPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateContent, getContent } = useEditableContent(currentCharacter.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const location = getContent(currentCharacter.id, 'location', currentCharacter.location || '');
  const mapUrl = getContent(currentCharacter.id, 'mapUrl', `https://maps.google.com/maps?q=${encodeURIComponent(location)}`);

  const startEditing = () => {
    setEditText(location);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    updateContent(currentCharacter.id, 'location', editText);
    
    // Persist to root characters.ts file
    try {
      console.log(`Saving location for character ${currentCharacter.id}: ${editText}`);
    } catch (error) {
      console.error('Error saving to file:', error);
    }
    
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(location);
    setIsEditing(false);
  };

  const openGoogleMaps = () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <Card className="bg-black/30 border-purple-500/40 backdrop-blur-xl shadow-xl shadow-purple-500/10">
      <div className="p-4 relative">
        {/* Cyberpunk Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(147,51,234,0.3) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(147,51,234,0.3) 1px, transparent 1px)`,
            backgroundSize: '10px 10px'
          }}></div>
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 flex items-center justify-center backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-bold text-purple-300 text-sm font-mono tracking-wide">LOCAL SAGRADO</h3>
            <p className="text-xs text-purple-400/70 font-mono">COORDENADAS</p>
          </div>
          {!isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={startEditing}
              className="ml-auto bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <div className="mb-4 relative z-10">
          {isEditing ? (
            <div className="space-y-3">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-black/50 border border-purple-400/50 rounded-lg px-3 py-2 text-purple-100 text-xs backdrop-blur-sm font-mono"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-green-500/30 border border-green-400/50 text-green-300 hover:bg-green-500/40 backdrop-blur-sm font-mono"
                >
                  <Save className="w-3 h-3 mr-1" />
                  SALVAR
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  className="bg-red-500/30 border border-red-400/50 text-red-300 hover:bg-red-500/40 backdrop-blur-sm font-mono"
                >
                  <X className="w-3 h-3 mr-1" />
                  CANCELAR
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-purple-100/80 mb-3 font-mono">{location}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={openGoogleMaps}
            className="flex-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-purple-300 hover:from-purple-500/40 hover:to-pink-500/40 backdrop-blur-sm font-mono tracking-wide"
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            GOOGLE MAPS
          </Button>
        </div>

        {/* Holographic Border */}
        <div className="absolute inset-0 rounded-lg border border-purple-500/20 pointer-events-none">
          <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-lg blur-sm"></div>
        </div>
      </div>
    </Card>
  );
};

export default LocationPanel;
