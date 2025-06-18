
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Compass, Circle } from "lucide-react";
import CharacterDisplay from "@/components/CharacterDisplay";
import BodhisattvaGallery from "@/components/BodhisattvaGallery";
import TeachingPanel from "@/components/TeachingPanel";
import LocationPanel from "@/components/LocationPanel";
import MeditationPanel from "@/components/MeditationPanel";
import NavigationBar from "@/components/NavigationBar";
import ModelViewer from "@/components/ModelViewer";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dharma");
  const { currentCharacter, currentCharacterId, progress, goToCharacter, totalCharacters } = useCharacterNavigation();

  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-black">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-7xl mx-auto">
        {/* Futuristic Header */}
        <header className="p-4 text-center bg-black/40 backdrop-blur-xl border-b border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse">
              <Circle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              TECHNO SUTRA ◊ STEM ARRAY
            </h1>
          </div>
          <Badge variant="outline" className="border-cyan-500/50 text-cyan-300 bg-cyan-500/10 backdrop-blur-sm font-mono text-xs">
            SUDHANA'S QUANTUM QUEST v2.1
          </Badge>
        </header>

        {/* Main Content Grid - Responsive */}
        <div className="flex-1 p-3 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Left Sidebar - Character Gallery */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <BodhisattvaGallery 
              currentCharacterId={currentCharacterId}
              onCharacterSelect={goToCharacter}
            />
          </div>

          {/* Center - Main Display */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative h-[50vh] lg:h-full">
              <CharacterDisplay character={currentCharacter} />
              {currentCharacter.glbStatus && (
                <div className="absolute inset-0 pointer-events-none">
                  <ModelViewer 
                    modelUrl={currentCharacter.modelUrl}
                    characterName={currentCharacter.name}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Info Panels */}
          <div className="lg:col-span-3 space-y-3 order-3">
            {/* Progress Card */}
            <Card className="bg-black/50 border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                    <Compass className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm font-mono">PROGRESSO</h3>
                    <p className="text-xs text-cyan-400 font-mono">SUDHANA'S PATH</p>
                  </div>
                </div>
                <Progress value={progress} className="mb-2 h-2 bg-gray-800" />
                <div className="flex justify-between text-xs text-cyan-400 mb-3 font-mono">
                  <span>{currentCharacterId} de {totalCharacters}</span>
                  <span>{progress}%</span>
                </div>
                <p className="text-xs text-cyan-300 font-mono">
                  📍 {currentCharacter.location || currentCharacter.locationDescription || "Local Sagrado"}
                </p>
              </div>
            </Card>

            <TeachingPanel characterId={currentCharacterId} />
            <LocationPanel characterId={currentCharacterId} />
            <MeditationPanel />
          </div>
        </div>

        {/* Modern Bottom Navigation */}
        <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-60"></div>
    </div>
  );
};

export default Index;
