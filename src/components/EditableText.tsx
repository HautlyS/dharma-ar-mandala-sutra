
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Check, X } from "lucide-react";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
  className?: string;
  multiline?: boolean;
}

const EditableText = ({ text, onSave, className = "", multiline = false }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    onSave(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded px-3 py-2 text-white text-sm resize-none"
            rows={3}
            autoFocus
          />
        ) : (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded px-3 py-2 text-white text-sm"
            autoFocus
          />
        )}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-green-500/20 border border-green-400/50 text-green-300 hover:bg-green-500/30"
          >
            <Check className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            className="bg-red-500/20 border border-red-400/50 text-red-300 hover:bg-red-500/30"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <p className={className}>{text}</p>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0 bg-white/10 hover:bg-white/20"
      >
        <Edit3 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default EditableText;
