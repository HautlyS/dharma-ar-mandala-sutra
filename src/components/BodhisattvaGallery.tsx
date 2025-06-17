
import { Card } from "@/components/ui/card";
import { Flower } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { characters } from "@/data/characters";
import { useState } from "react";

const BodhisattvaGallery = () => {
  const { currentCharacter, goToCharacter, visitedCharacters } = useCharacterNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCharacters = searchTerm ? filteredCharacters : characters.slice(0, 8);

  const getCharacterColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-700",
      "from-green-500 to-green-700", 
      "from-purple-500 to-purple-700",
      "from-red-500 to-red-700",
      "from-yellow-500 to-orange-600",
      "from-pink-500 to-pink-700",
      "from-indigo-500 to-indigo-700",
      "from-teal-500 to-teal-700"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-white mb-1">Mestres</h3>
        <p className="text-xs text-gray-400">56 Bodhisattvas</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar mestre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded px-3 py-2 text-white text-xs placeholder-gray-400"
        />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayedCharacters.map((character, index) => (
          <Card
            key={character.id}
            onClick={() => goToCharacter(character.id)}
            className={`bg-black/40 backdrop-blur-md border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group ${
              currentCharacter.id === character.id ? 'border-gold/50 bg-gold/10' : ''
            }`}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${getCharacterColor(index)} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg relative`}>
                  <Flower className="w-5 h-5 text-white/90" />
                  {visitedCharacters.has(character.id) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border border-black/50"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white mb-1 truncate">
                    {character.id}. {character.name}
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    {character.liberacao || "Ensinamento Transcendental"}
                  </p>
                </div>
                {currentCharacter.id === character.id && (
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!searchTerm && (
        <Card className="bg-black/20 border-dashed border-white/20 backdrop-blur-md">
          <div className="p-4 text-center">
            <p className="text-xs text-gray-400">+{characters.length - 8} outros mestres</p>
            <div className="flex justify-center mt-2 gap-1">
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BodhisattvaGallery;
