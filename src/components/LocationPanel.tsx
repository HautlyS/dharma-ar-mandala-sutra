
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Save, X, ExternalLink } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { usePersistentEdit } from "@/hooks/usePersistentEdit";

const LocationPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateCharacterContent, getCharacterContent } = usePersistentEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const location = getCharacterContent(currentCharacter.id, 'location');

  useEffect(() => {
    setIsEditing(false);
    setEditText("");
  }, [currentCharacter.id]);

  const startEditing = () => {
    setEditText(location);
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateCharacterContent(currentCharacter.id, 'location', editText);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(location);
    setIsEditing(false);
  };

  const openGoogleMaps = () => {
    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-purple-400/70 font-mono">CAP. {String(currentCharacter.id).padStart(2, '0')} - COORDENADAS</p>
        {!isEditing && (
          <Button
            size="sm"
            variant="ghost"
            onClick={startEditing}
            className="bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm h-6 px-2"
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-black/50 border border-purple-400/50 rounded-lg px-3 py-2 text-purple-100 text-xs backdrop-blur-sm font-mono"
            autoFocus
            placeholder="Digite o local sagrado..."
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={saveEdit}
              className="bg-green-500/30 border border-green-400/50 text-green-300 hover:bg-green-500/40 text-xs h-6 px-2"
            >
              <Save className="w-3 h-3 mr-1" />
              SALVAR
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={cancelEdit}
              className="bg-red-500/30 border border-red-400/50 text-red-300 hover:bg-red-500/40 text-xs h-6 px-2"
            >
              <X className="w-3 h-3 mr-1" />
              CANCELAR
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-xs text-purple-100/80 mb-3 font-mono">{location}</p>
          <Button
            size="sm"
            onClick={openGoogleMaps}
            className="w-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-purple-300 hover:from-purple-500/40 hover:to-pink-500/40 backdrop-blur-sm font-mono text-xs h-6"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            GOOGLE MAPS
          </Button>
        </>
      )}
    </div>
  );
};

export default LocationPanel;
