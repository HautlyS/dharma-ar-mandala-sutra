
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModelViewer from "./ModelViewer";
import NavigationArrows from "./NavigationArrows";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { characters } from "@/data/characters";

const CharacterDisplay = () => {
  const { currentCharacter, currentIndex, totalCharacters, goToPrevious, goToNext } = useCharacterNavigation();

  return (
    <Card className="h-full bg-black/20 border-cyan-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-cyan-500/20">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* 3D Model Viewer */}
      <div className="absolute inset-0">
        <ModelViewer 
          modelUrl={currentCharacter.modelUrl}
          characterName={currentCharacter.name}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
      </div>

      {/* Navigation Arrows */}
      <NavigationArrows
        onPrevious={goToPrevious}
        onNext={goToNext}
        currentIndex={currentIndex}
        totalCharacters={totalCharacters}
      />

      {/* Top Info Overlay - Cyberpunk Style */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <div className="flex justify-between items-start">
          <div className="backdrop-blur-md bg-black/40 border border-cyan-500/50 rounded-lg p-4 shadow-lg shadow-cyan-500/20">
            <Badge variant="outline" className="border-cyan-400/70 text-cyan-300 bg-cyan-500/20 backdrop-blur-sm mb-3 font-mono">
              CAPÍTULO {String(currentCharacter.id).padStart(2, '0')}
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-2 font-mono tracking-wide">{currentCharacter.name}</h2>
            <p className="text-sm text-cyan-300/80 font-mono">{currentCharacter.liberacao || "Ensinamento Transcendental"}</p>
          </div>
          <div className="text-right backdrop-blur-md bg-black/40 border border-purple-500/50 rounded-lg p-3 shadow-lg shadow-purple-500/20">
            <div className="text-purple-300 text-lg font-mono">॥ गण्डव्यूह सूत्र ॥</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area - Futuristic */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-300 font-medium text-sm font-mono">PRÓXIMO MESTRE</p>
              <p className="text-gray-300/80 text-xs font-mono">
                {currentIndex < totalCharacters - 1 
                  ? `${String(currentCharacter.id + 1).padStart(2, '0')}. ${characters[currentIndex + 1]?.name || 'Fim da Jornada'}`
                  : "01. Buda Śākyamuni"
                }
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
                <span className="text-sm text-cyan-300 font-mono font-bold">{currentCharacter.name.charAt(0)}</span>
              </div>
              <div className="w-2 h-8 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles - Enhanced */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${
              i % 3 === 0 ? 'bg-cyan-400/60' : 
              i % 3 === 1 ? 'bg-purple-400/60' : 'bg-pink-400/60'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Holographic Border Effect */}
      <div className="absolute inset-0 rounded-lg border border-cyan-500/30 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-sm opacity-50"></div>
      </div>
    </Card>
  );
};

export default CharacterDisplay;
