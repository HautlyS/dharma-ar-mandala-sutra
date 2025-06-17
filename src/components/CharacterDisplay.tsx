
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ModelViewer from "./ModelViewer";
import NavigationArrows from "./NavigationArrows";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";

const CharacterDisplay = () => {
  const { currentCharacter, currentIndex, totalCharacters, goToPrevious, goToNext } = useCharacterNavigation();

  return (
    <Card className="h-full bg-black/30 border-white/10 backdrop-blur-md relative overflow-hidden">
      {/* 3D Model Viewer */}
      <div className="absolute inset-0">
        <ModelViewer 
          modelUrl={currentCharacter.modelUrl}
          characterName={currentCharacter.name}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Navigation Arrows */}
      <NavigationArrows
        onPrevious={goToPrevious}
        onNext={goToNext}
        currentIndex={currentIndex}
        totalCharacters={totalCharacters}
      />

      {/* Top Info Overlay */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="border-gold/50 text-gold bg-black/40 backdrop-blur-sm mb-2">
              Capítulo {currentCharacter.id}
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-1">{currentCharacter.name}</h2>
            <p className="text-sm text-gray-300">{currentCharacter.liberacao || "Ensinamento Transcendental"}</p>
          </div>
          <div className="text-right">
            <div className="text-gold/80 text-lg font-sanskrit">॥ गण्डव्यूह सूत्र ॥</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-sm">Próximo Mestre</p>
              <p className="text-gray-400 text-xs">
                {currentIndex < totalCharacters - 1 
                  ? `${currentCharacter.id + 1}. ${characters[currentIndex + 1]?.name || 'Fim da Jornada'}`
                  : "1. Buda Śākyamuni"
                }
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center">
                <span className="text-xs text-gold">{currentCharacter.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </Card>
  );
};

export default CharacterDisplay;
