
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, MapPin } from "lucide-react";
import EditableText from "./EditableText";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useEditableContent } from "@/hooks/useEditableContent";

const TeachingPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateContent, getContent } = useEditableContent(currentCharacter.id);

  const teaching = getContent(currentCharacter.id, 'teaching', currentCharacter.teaching || '');

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
          {currentCharacter.liberacao || "Sabedoria Transcendental"}
        </h4>
        
        <div className="mb-3">
          <EditableText
            text={teaching}
            onSave={(newText) => updateContent(currentCharacter.id, 'teaching', newText)}
            className="text-xs text-gray-300 leading-relaxed"
            multiline
          />
        </div>
        
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
