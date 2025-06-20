
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Compass, Circle, Crown, Flower } from "lucide-react";
import CharacterDisplay from "@/components/CharacterDisplay";
import BodhisattvaGallery from "@/components/BodhisattvaGallery";
import TeachingPanel from "@/components/TeachingPanel";
import LocationPanel from "@/components/LocationPanel";
import MeditationPanel from "@/components/MeditationPanel";
import NavigationBar from "@/components/NavigationBar";
import ModelViewer from "@/components/ModelViewer";
import SearchBar from "@/components/SearchBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useModelPreloader } from "@/hooks/useModelPreloader";
import { Character } from "@/data/characters";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState("dharma");
  const [showSearch, setShowSearch] = useState(false);
  const { currentCharacter, currentCharacterId, progress, goToCharacter, totalCharacters } = useCharacterNavigation();

  // Handle search character selection
  const handleSearchSelect = (character: Character) => {
    goToCharacter(character.id);
    setShowSearch(false);
  };

  // Handle URL parameters for direct character navigation
  useEffect(() => {
    const characterParam = searchParams.get('character');
    if (characterParam) {
      const characterId = parseInt(characterParam, 10);
      if (!isNaN(characterId) && characterId >= 1 && characterId <= totalCharacters) {
        goToCharacter(characterId);
      }
    }
  }, [searchParams, goToCharacter, totalCharacters]);

  // Preload adjacent models for better performance
  useModelPreloader(currentCharacterId, {
    preloadNext: 3,
    preloadPrevious: 2,
    preloadPopular: true,
    priority: 'low'
  });

  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-black">
      {/* Enhanced Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255,215,0,0.1) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px'
        }}></div>
      </div>

      {/* Tibetan Sacred Geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-gold text-8xl font-sanskrit animate-pulse">ॐ</div>
        <div className="absolute top-20 right-20 text-cyan-400 text-6xl font-sanskrit animate-pulse">☸</div>
        <div className="absolute bottom-20 left-20 text-purple-400 text-6xl font-sanskrit animate-pulse">🕉</div>
        <div className="absolute bottom-10 right-10 text-gold text-4xl font-sanskrit animate-pulse">✨</div>
      </div>

      {/* Floating Particles Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              i % 3 === 0 ? 'bg-cyan-400/40' : 
              i % 3 === 1 ? 'bg-gold/40' : 
              'bg-purple-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto">
        {/* Enhanced Futuristic Header */}
        <header className="p-3 md:p-4 text-center bg-black/40 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse">
              <Circle className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              TECHNO SUTRA ◊ STEM ARRAY
            </h1>
            <Crown className="w-4 h-4 md:w-5 md:h-5 text-gold animate-pulse" />
          </div>
          <Badge variant="outline" className="border-cyan-500/50 text-cyan-300 bg-cyan-500/10 backdrop-blur-sm font-mono text-xs">
            SUDHANA'S QUANTUM QUEST v2.1 • {totalCharacters} MESTRES
          </Badge>
          <div className="text-gold/60 text-xs font-sanskrit mt-1">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </div>

          {/* Search Bar */}
          <div className="mt-4 max-w-md mx-auto">
            <SearchBar
              onCharacterSelect={handleSearchSelect}
              placeholder="Buscar mestres sagrados..."
              className="w-full"
            />
          </div>
        </header>

        {/* Responsive Main Content Grid */}
        <div className="flex-1 p-2 md:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6 min-h-0">
          {/* Left Sidebar - Character Gallery */}
          <div className="lg:col-span-3 order-2 lg:order-1 min-h-0">
            <BodhisattvaGallery 
              currentCharacterId={currentCharacterId}
              onCharacterSelect={goToCharacter}
            />
          </div>

          {/* Center - Main Display */}
          <div className="lg:col-span-6 order-1 lg:order-2 min-h-0">
            <div className="relative h-[40vh] md:h-[50vh] lg:h-full min-h-[300px]">
              <CharacterDisplay character={currentCharacter} />
              {currentCharacter.glbStatus ? (
                <div className="absolute inset-0 pointer-events-none">
                  <ModelViewer
                    modelUrl={currentCharacter.modelUrl}
                    characterName={currentCharacter.name}
                    priority="high"
                    showPerformanceInfo={process.env.NODE_ENV === 'development'}
                    enableAutoOptimization={true}
                    quality="high"
                    onLoadStart={() => console.log(`Loading ${currentCharacter.name}...`)}
                    onLoadComplete={() => console.log(`Loaded ${currentCharacter.name}`)}
                    onError={(error) => console.error(`Error loading ${currentCharacter.name}:`, error)}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 pointer-events-none">
                  <LoadingSkeleton variant="model" />
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Info Panels */}
          <div className="lg:col-span-3 space-y-3 order-3 min-h-0">
            {/* Enhanced Progress Card */}
            <Card className="bg-black/50 border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <div className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/50">
                    <Compass className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm font-mono">PROGRESSO</h3>
                    <p className="text-xs text-cyan-400 font-mono">SUDHANA'S PATH</p>
                  </div>
                  <Flower className="w-4 h-4 text-gold animate-pulse ml-auto" />
                </div>
                <Progress value={progress} className="mb-2 h-2 bg-gray-800" />
                <div className="flex justify-between text-xs text-cyan-400 mb-3 font-mono">
                  <span>{currentCharacterId} de {totalCharacters}</span>
                  <span>{progress}%</span>
                </div>
                <p className="text-xs text-cyan-300 font-mono">
                  📍 {currentCharacter.location || currentCharacter.locationDescription || "Local Sagrado"}
                </p>
                <div className="text-gold/60 text-xs font-sanskrit mt-2 text-center">
                  ॐ गते गते पारगते पारसंगते बोधि स्वाहा ॐ
                </div>
              </div>
            </Card>

            <TeachingPanel characterId={currentCharacterId} />
            <LocationPanel characterId={currentCharacterId} />
            <MeditationPanel />
          </div>
        </div>

        {/* Enhanced Bottom Navigation */}
        <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Enhanced Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse opacity-40"></div>
    </div>
  );
};

export default Index;
