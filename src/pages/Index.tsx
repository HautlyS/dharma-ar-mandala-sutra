
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Compass, Cpu, Zap } from "lucide-react";
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
      {/* Enhanced Cyberpunk Background */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/35b517d3-6624-44af-bef8-df7dab2fd142.png" 
          alt="Mystical background" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-cyan-900/20 to-purple-900/30"></div>
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>

        {/* Holographic Scanning Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-7xl mx-auto">
        {/* Futuristic Header */}
        <header className="p-6 text-center bg-black/40 backdrop-blur-xl border-b border-cyan-500/30">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center relative">
              <Cpu className="w-6 h-6 text-white" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-50 animate-pulse"></div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono tracking-wider">
              TECHNO SUTRA
            </h1>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative">
              <Zap className="w-6 h-6 text-white" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-50 animate-pulse"></div>
            </div>
          </div>
          <div className="text-lg font-mono text-cyan-300 mb-2 tracking-widest">STEM ARRAY PROTOCOL</div>
          <Badge variant="outline" className="border-cyan-400/70 text-cyan-300 bg-cyan-500/20 backdrop-blur-sm font-mono">
            SUDHANA.EXE - ULTIMATE TRUTH QUEST
          </Badge>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 p-6 grid grid-cols-12 gap-6">
          {/* Left Sidebar - Enhanced Gallery */}
          <div className="col-span-3">
            <div className="bg-black/30 backdrop-blur-xl border border-cyan-500/30 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10">
              <BodhisattvaGallery />
            </div>
          </div>

          {/* Center - Main Character Display */}
          <div className="col-span-6">
            <CharacterDisplay />
          </div>

          {/* Right Sidebar - Info Stack */}
          <div className="col-span-3 space-y-4">
            {/* Enhanced Progress Card */}
            <Card className="bg-black/30 border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
              <div className="p-4 relative">
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), 
                                     linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '10px 10px'
                  }}></div>
                </div>

                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
                    <Compass className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-cyan-300 text-sm font-mono tracking-wide">PROGRESSO</h3>
                    <p className="text-xs text-cyan-400/70 font-mono">DHARMA PATH</p>
                  </div>
                </div>
                
                <Progress value={progress} className="mb-3 h-3 bg-black/50 border border-cyan-500/30" />
                <div className="flex justify-between text-xs text-cyan-300/80 mb-4 font-mono">
                  <span>{visitedCharacters.size} DE {totalCharacters}</span>
                  <span>{Math.round(progress)}% COMPLETO</span>
                </div>
                <p className="text-xs text-cyan-400/90 font-mono">📡 GANDAVYUHA SUTRA PROTOCOL</p>

                {/* Holographic Border */}
                <div className="absolute inset-0 rounded-lg border border-cyan-500/20 pointer-events-none">
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-lg blur-sm"></div>
                </div>
              </div>
            </Card>

            <TeachingPanel />
            <LocationPanel />
            <MeditationPanel />
          </div>
        </div>

        {/* Enhanced Bottom Navigation */}
        <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
