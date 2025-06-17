
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { characters } from "@/data/characters";

const BodhisattvaGallery = () => {
  const { currentCharacter, goToCharacter, visitedCharacters } = useCharacterNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.liberacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/30 bg-black/40 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-cyan-300 mb-3 font-mono tracking-wide">
          BODHISATTVAS DATABASE
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-4 h-4" />
          <Input
            placeholder="Buscar mestre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/50 border-cyan-500/50 text-cyan-100 placeholder-cyan-400/70 focus:border-cyan-400 font-mono text-sm"
          />
        </div>
      </div>

      {/* Character List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredCharacters.map((character) => {
          const isVisited = visitedCharacters.has(character.id);
          const isCurrent = currentCharacter.id === character.id;
          
          return (
            <Card
              key={character.id}
              onClick={() => goToCharacter(character.id)}
              className={`p-3 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                isCurrent
                  ? "bg-cyan-500/30 border-cyan-400/70 shadow-lg shadow-cyan-500/30"
                  : isVisited
                  ? "bg-purple-500/20 border-purple-400/50 hover:bg-purple-500/30"
                  : "bg-black/30 border-gray-500/30 hover:bg-cyan-500/20 hover:border-cyan-400/50"
              }`}
            >
              {/* Cyberpunk Grid Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 mini-grid"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono border ${
                    isCurrent
                      ? "bg-cyan-500/40 border-cyan-400/70 text-cyan-300"
                      : isVisited
                      ? "bg-purple-500/40 border-purple-400/70 text-purple-300"
                      : "bg-gray-500/40 border-gray-400/70 text-gray-300"
                  }`}>
                    {String(character.id).padStart(2, '0')}
                  </div>
                  
                  {/* Status Indicator */}
                  <div className={`w-2 h-2 rounded-full ${
                    isCurrent
                      ? "bg-cyan-400 animate-pulse"
                      : isVisited
                      ? "bg-purple-400"
                      : "bg-gray-500/50"
                  }`}></div>
                </div>

                <h4 className={`text-sm font-bold mb-1 font-mono ${
                  isCurrent
                    ? "text-cyan-300"
                    : isVisited
                    ? "text-purple-300"
                    : "text-gray-300"
                }`}>
                  {character.name}
                </h4>
                
                {character.liberacao && character.liberacao !== "-" && character.liberacao !== "!" && (
                  <p className={`text-xs leading-tight font-mono ${
                    isCurrent
                      ? "text-cyan-400/80"
                      : isVisited
                      ? "text-purple-400/80"
                      : "text-gray-400/80"
                  }`}>
                    {character.liberacao}
                  </p>
                )}
              </div>

              {/* Holographic Border Effect */}
              {isCurrent && (
                <div className="absolute inset-0 rounded-lg border border-cyan-500/30 pointer-events-none">
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-lg blur-sm animate-pulse"></div>
                </div>
              )}

              {/* Progress Indicator */}
              <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                isCurrent
                  ? "w-full bg-gradient-to-r from-cyan-400 to-purple-400"
                  : isVisited
                  ? "w-3/4 bg-purple-400/60"
                  : "w-0 bg-gray-500/50"
              }`}></div>
            </Card>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-cyan-500/30 bg-black/40 backdrop-blur-xl">
        <div className="text-xs text-cyan-400/80 font-mono text-center">
          <div className="flex justify-between mb-1">
            <span>VISITADOS</span>
            <span>{visitedCharacters.size}/{characters.length}</span>
          </div>
          <div className="w-full bg-black/50 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full transition-all duration-500"
              style={{ width: `${(visitedCharacters.size / characters.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodhisattvaGallery;
