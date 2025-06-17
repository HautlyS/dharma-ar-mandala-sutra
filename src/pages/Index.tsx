
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Compass, Flower, Circle } from "lucide-react";
import CharacterDisplay from "@/components/CharacterDisplay";
import BodhisattvaGallery from "@/components/BodhisattvaGallery";
import TeachingPanel from "@/components/TeachingPanel";
import LocationPanel from "@/components/LocationPanel";
import MeditationPanel from "@/components/MeditationPanel";
import NavigationBar from "@/components/NavigationBar";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dharma");
  const { progress, visitedCharacters, totalCharacters } = useCharacterNavigation();

  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/35b517d3-6624-44af-bef8-df7dab2fd142.png" 
          alt="Mystical background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-6xl mx-auto">
        {/* Modern Header */}
        <header className="p-6 text-center bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red to-red-500 flex items-center justify-center bg-zinc-950">
              <Circle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gold to-red-400 bg-clip-text text-transparent">
              Techno Sutra - Stem Array
            </h1>
          </div>
          <Badge variant="outline" className="border-red-500/50 text-red-300 bg-red-500/10 backdrop-blur-sm">
            Sudhana's quest for the ultimate truth
          </Badge>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 p-6 grid grid-cols-12 gap-6">
          {/* Left Sidebar - Compressed Bodhisattva Gallery */}
          <div className="col-span-3">
            <BodhisattvaGallery />
          </div>

          {/* Center - Main Character Display */}
          <div className="col-span-6">
            <CharacterDisplay />
          </div>

          {/* Right Sidebar - Info Stack */}
          <div className="col-span-3 space-y-4">
            {/* Progress Card */}
            <Card className="bg-black/50 border-white/10 backdrop-blur-md">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Compass className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Progresso</h3>
                    <p className="text-xs text-gray-400">Caminho de Sudhana</p>
                  </div>
                </div>
                <Progress value={progress} className="mb-2 h-2" />
                <div className="flex justify-between text-xs text-gray-400 mb-3">
                  <span>{visitedCharacters.size} de {totalCharacters}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <p className="text-xs text-blue-300">📍 Gandavyuha Sutra Journey</p>
              </div>
            </Card>

            <TeachingPanel />
            <LocationPanel />
            <MeditationPanel />
          </div>
        </div>

        {/* Modern Bottom Navigation */}
        <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </div>
  );
};

export default Index;
