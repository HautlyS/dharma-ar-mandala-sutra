
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Save, X } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { usePersistentEdit } from "@/hooks/usePersistentEdit";

const TeachingPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateCharacterContent, getCharacterContent } = usePersistentEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  const teaching = getCharacterContent(currentCharacter.id, 'teaching');

  useEffect(() => {
    setIsEditing(false);
    setEditText("");
  }, [currentCharacter.id]);

  const startEditing = () => {
    setEditText(teaching);
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateCharacterContent(currentCharacter.id, 'teaching', editText);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(teaching);
    setIsEditing(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-blue-300 font-mono">
          {currentCharacter.liberacao && currentCharacter.liberacao !== "-" && currentCharacter.liberacao !== "!" 
            ? currentCharacter.liberacao 
            : "Sabedoria Transcendental"
          }
        </h4>
        {!isEditing && (
          <Button
            size="sm"
            variant="ghost"
            onClick={startEditing}
            className="bg-blue-500/20 border border-blue-400/50 text-blue-300 hover:bg-blue-500/30 backdrop-blur-sm h-6 px-2"
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-black/50 border border-blue-400/50 rounded-lg px-3 py-2 text-blue-100 text-xs leading-relaxed resize-none backdrop-blur-sm font-mono"
            rows={4}
            autoFocus
            placeholder="Digite o ensinamento..."
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
        <p className="text-xs text-blue-100/80 leading-relaxed font-mono">{teaching}</p>
      )}
    </div>
  );
};

export default TeachingPanel;
