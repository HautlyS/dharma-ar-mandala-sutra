
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flower, Download, CheckCircle, XCircle } from "lucide-react";
import { characters } from "@/data/characters";

interface BodhisattvaGalleryProps {
  currentCharacterId: number;
  onCharacterSelect: (id: number) => void;
}

const BodhisattvaGallery = ({ currentCharacterId, onCharacterSelect }: BodhisattvaGalleryProps) => {
  // Show first 8 characters in detail, then summary for others
  const displayedCharacters = characters.slice(0, 8);
  const remainingCount = characters.length - 8;

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-white mb-1 font-mono text-lg">MESTRES</h3>
        <p className="text-xs text-cyan-400 font-mono">{characters.length} BODHISATTVAS</p>
      </div>

      <div className="space-y-3 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-cyan-500">
        {displayedCharacters.map((character) => (
          <Card
            key={character.id}
            onClick={() => onCharacterSelect(character.id)}
            className={`bg-black/40 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-cyan-500/20 ${
              character.id === currentCharacterId ? 'border-cyan-400/80 bg-cyan-500/10 shadow-cyan-500/30' : ''
            }`}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-cyan-400/50">
                    <Flower className="w-5 h-5 text-white/90" />
                  </div>
                  {character.glbStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 absolute -top-1 -right-1" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white mb-1 font-mono">
                    {character.name}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono">
                    {character.occupation}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {character.significance}
                  </p>
                </div>
                {character.id === currentCharacterId && (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                )}
              </div>
              {character.liberacao && character.liberacao !== "-" && (
                <Badge variant="outline" className="mt-2 text-xs border-purple-500/50 text-purple-300 bg-purple-500/10 font-mono">
                  {character.liberacao.substring(0, 30)}...
                </Badge>
              )}
            </div>
          </Card>
        ))}

        {/* Remaining Characters Summary */}
        {remainingCount > 0 && (
          <Card className="bg-black/20 border-dashed border-cyan-500/30 backdrop-blur-xl">
            <div className="p-4 text-center">
              <p className="text-xs text-cyan-400 font-mono">+{remainingCount} OUTROS MESTRES</p>
              <div className="flex justify-center mt-2 gap-1">
                <div className="w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="mt-2 space-y-1">
                {characters.slice(8, 15).map((char) => (
                  <button
                    key={char.id}
                    onClick={() => onCharacterSelect(char.id)}
                    className={`block w-full text-left px-2 py-1 rounded text-xs font-mono transition-colors ${
                      char.id === currentCharacterId 
                        ? 'bg-cyan-500/20 text-cyan-300' 
                        : 'text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    {char.id}. {char.name}
                  </button>
                ))}
                {characters.length > 15 && (
                  <p className="text-xs text-gray-600 font-mono mt-1">
                    ... e mais {characters.length - 15} personagens
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BodhisattvaGallery;
