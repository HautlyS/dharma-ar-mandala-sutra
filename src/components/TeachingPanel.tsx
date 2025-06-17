
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Edit3, Save, X } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useEditableContent } from "@/hooks/useEditableContent";

const TeachingPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateContent, getContent } = useEditableContent(currentCharacter.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const teaching = getContent(currentCharacter.id, 'teaching', currentCharacter.teaching || '');

  const startEditing = () => {
    setEditText(teaching);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    updateContent(currentCharacter.id, 'teaching', editText);
    
    // Persist to root characters.ts file (simulated - in real app would be API call)
    try {
      console.log(`Saving teaching for character ${currentCharacter.id}: ${editText}`);
      // Here you would make an API call to update the characters.ts file
      // For now, we'll just update localStorage and log the action
    } catch (error) {
      console.error('Error saving to file:', error);
    }
    
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(teaching);
    setIsEditing(false);
  };

  return (
    <Card className="bg-black/30 border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <div className="p-4 relative">
        {/* Cyberpunk Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '10px 10px'
          }}></div>
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
            <Compass className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 text-sm font-mono tracking-wide">ENSINAMENTO</h3>
            <p className="text-xs text-cyan-400/70 font-mono">DHARMA ATUAL</p>
          </div>
          {!isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={startEditing}
              className="ml-auto bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 backdrop-blur-sm"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <h4 className="text-sm font-medium text-purple-300 mb-3 font-mono">
          {currentCharacter.liberacao || "Sabedoria Transcendental"}
        </h4>
        
        <div className="mb-4 relative z-10">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-black/50 border border-cyan-400/50 rounded-lg px-3 py-2 text-cyan-100 text-xs leading-relaxed resize-none backdrop-blur-sm font-mono"
                rows={4}
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
            <p className="text-xs text-cyan-100/80 leading-relaxed font-mono">{teaching}</p>
          )}
        </div>
        
        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 text-cyan-300 hover:from-cyan-500/40 hover:to-purple-500/40 backdrop-blur-sm font-mono tracking-wide"
        >
          CONTINUAR JORNADA →
        </Button>

        {/* Holographic Border */}
        <div className="absolute inset-0 rounded-lg border border-cyan-500/20 pointer-events-none">
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg blur-sm"></div>
        </div>
      </div>
    </Card>
  );
};

export default TeachingPanel;
