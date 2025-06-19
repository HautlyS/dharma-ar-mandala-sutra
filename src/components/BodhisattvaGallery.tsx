
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flower, CheckCircle, XCircle, Lotus, Crown } from "lucide-react";
import { characters } from "@/data/characters";

interface BodhisattvaGalleryProps {
  currentCharacterId: number;
  onCharacterSelect: (id: number) => void;
}

const BodhisattvaGallery = ({ currentCharacterId, onCharacterSelect }: BodhisattvaGalleryProps) => {
  return (
    <div className="space-y-4">
      {/* Enhanced Header with Tibetan Elements */}
      <div className="text-center mb-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-lg p-4 border border-cyan-500/30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-gold animate-pulse" />
          <h3 className="font-semibold text-white mb-1 font-mono text-lg neon-text">MESTRES SAGRADOS</h3>
          <Lotus className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-xs text-cyan-400 font-mono">56 BODHISATTVAS COMPLETOS</p>
        <div className="text-gold/60 text-xs font-sanskrit mt-1">॥ सर्वे भवन्तु सुखिनः ॥</div>
      </div>

      {/* All Characters Display */}
      <div className="space-y-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gradient">
        {characters.map((character) => (
          <Card
            key={character.id}
            onClick={() => onCharacterSelect(character.id)}
            className={`bg-black/40 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] ${
              character.id === currentCharacterId ? 'border-cyan-400/80 bg-cyan-500/10 shadow-cyan-500/30 scale-[1.02]' : ''
            }`}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    character.occupation === 'Buda' ? 'from-gold to-yellow-600' :
                    character.occupation === 'Bodhisattva' ? 'from-cyan-500 to-purple-600' :
                    character.occupation === 'Arhat' ? 'from-orange-500 to-red-600' :
                    character.occupation === 'Monge' ? 'from-orange-400 to-orange-600' :
                    character.occupation === 'Freira' ? 'from-pink-500 to-purple-600' :
                    'from-green-500 to-blue-600'
                  } rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-cyan-400/50`}>
                    <Flower className="w-5 h-5 text-white/90" />
                  </div>
                  {character.glbStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 absolute -top-1 -right-1" />
                  )}
                  {character.id === currentCharacterId && (
                    <div className="absolute -inset-1 bg-cyan-400/30 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400">{character.id.toString().padStart(2, '0')}</span>
                    <h4 className="text-sm font-medium text-white font-mono truncate">
                      {character.name}
                    </h4>
                  </div>
                  <p className="text-xs text-cyan-400 font-mono truncate">
                    {character.occupation}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {character.significance}
                  </p>
                </div>
                <div className="text-right">
                  {character.id === currentCharacterId && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
              
              {/* Liberation Teaching Badge */}
              {character.liberacao && character.liberacao !== "-" && (
                <Badge variant="outline" className="mt-2 text-xs border-purple-500/50 text-purple-300 bg-purple-500/10 font-mono w-full justify-center truncate">
                  {character.liberacao}
                </Badge>
              )}
              
              {/* Location Info */}
              {(character.location || character.locationDescription) && (
                <div className="mt-1 text-xs text-gray-500 font-mono truncate">
                  📍 {character.location || character.locationDescription}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-black/20 border border-cyan-500/30 backdrop-blur-xl rounded-lg p-3 text-center">
        <p className="text-xs text-cyan-400 font-mono mb-1">JORNADA COMPLETA</p>
        <div className="flex justify-center gap-2 text-xs font-mono">
          <span className="text-green-400">{characters.filter(c => c.glbStatus).length} MODELOS 3D</span>
          <span className="text-gray-400">•</span>
          <span className="text-blue-400">{characters.length} MESTRES</span>
        </div>
        <div className="text-gold/60 text-xs font-sanskrit mt-2">
          ॐ मणि पद्मे हूँ ॐ
        </div>
      </div>
    </div>
  );
};

export default BodhisattvaGallery;
