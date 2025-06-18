
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Edit3, Save, X } from "lucide-react";
import { usePersistentEdit } from "@/hooks/usePersistentEdit";
import { characters } from "@/data/characters";
import { useState } from "react";

interface TeachingPanelProps {
  characterId: number;
}

const TeachingPanel = ({ characterId }: TeachingPanelProps) => {
  const [editValue, setEditValue] = useState("");
  const { isEditing, setIsEditing, value, handleSave } = usePersistentEdit(characterId, 'teaching');
  
  const character = characters.find(c => c.id === characterId);
  const displayValue = value || character?.teaching || "Ensinamento não definido";

  const startEdit = () => {
    setEditValue(displayValue);
    setIsEditing(true);
  };

  const saveEdit = () => {
    handleSave(editValue);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue("");
  };

  return (
    <Card className="bg-black/50 border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
            <Compass className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm font-mono">ENSINAMENTO</h3>
            <p className="text-xs text-purple-400 font-mono">DHARMA ATUAL</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={startEdit}
            className="w-8 h-8 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        
        <h4 className="text-sm font-medium text-white mb-2 font-mono">
          {character?.liberacao && character.liberacao !== "-" 
            ? character.liberacao 
            : "A Natureza da Sabedoria"}
        </h4>
        
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 text-xs bg-black/50 border border-cyan-500/30 rounded text-cyan-300 font-mono resize-none"
              rows={3}
              placeholder="Digite o ensinamento..."
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={saveEdit}
                className="flex-1 bg-green-500/20 border border-green-400/50 text-green-300 hover:bg-green-500/30 font-mono"
              >
                <Save className="w-3 h-3 mr-1" />
                SALVAR
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={cancelEdit}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs text-cyan-300 mb-3 leading-relaxed font-mono">
              "{displayValue}"
            </p>
            <Button
              size="sm"
              className="w-full bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm font-mono"
            >
              CONTINUAR →
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default TeachingPanel;
