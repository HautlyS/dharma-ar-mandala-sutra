
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Character } from "@/data/characters";

interface CharacterDisplayProps {
  character: Character;
}

const CharacterDisplay = ({ character }: CharacterDisplayProps) => {
  const getChapterNumber = (id: number) => {
    return `Capítulo ${id}`;
  };

  const getNextCharacter = (currentId: number, totalCharacters: number) => {
    const nextId = currentId < totalCharacters ? currentId + 1 : 1;
    return `Próximo: ${nextId}`;
  };

  return (
    <Card className="h-full bg-black/30 border-white/10 backdrop-blur-md relative overflow-hidden">
      {/* Main Character Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/c219c420-66d4-4e18-8ba6-e6667fac8aba.png" 
          alt={character.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Tibetan Cyberpunk Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 text-cyan-400/30 text-6xl font-sanskrit">ॐ</div>
        <div className="absolute bottom-4 right-4 text-purple-400/30 text-4xl font-sanskrit">🕉</div>
        <div className="absolute top-1/2 left-2 text-gold/20 text-2xl font-sanskrit">☸</div>
      </div>

      {/* Top Info Overlay */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="border-gold/50 text-gold bg-black/40 backdrop-blur-sm mb-2 font-mono">
              {getChapterNumber(character.id)}
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-1 neon-text">
              {character.name}
            </h2>
            <p className="text-sm text-cyan-300 font-mono">
              {character.significance}
            </p>
            <p className="text-xs text-gray-300 mt-1">
              {character.occupation}
            </p>
          </div>
          <div className="text-right">
            <div className="text-gold/80 text-lg font-sanskrit animate-pulse">
              ॥ गण्डव्यूह सूत्र ॥
            </div>
          </div>
        </div>
      </div>

      {/* Center Liberation Teaching */}
      {character.liberacao && character.liberacao !== "-" && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-black/70 backdrop-blur-md rounded-lg p-4 border border-cyan-500/30 max-w-md">
            <h3 className="text-cyan-400 font-mono text-sm mb-2">LIBERAÇÃO</h3>
            <p className="text-white text-sm font-medium">
              {character.liberacao}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Action Area */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-sm font-mono">
                {getNextCharacter(character.id, 56)}
              </p>
              <p className="text-cyan-400 text-xs font-mono">
                {character.location || character.locationDescription || "Local Sagrado"}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse border border-cyan-400/50">
                <span className="text-xs text-white font-mono">
                  {character.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default CharacterDisplay;
