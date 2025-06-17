
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, MapPin, BookOpen, Users } from "lucide-react";
import CharacterDisplay from "@/components/CharacterDisplay";
import BodhisattvaGallery from "@/components/BodhisattvaGallery";
import TeachingPanel from "@/components/TeachingPanel";
import LocationPanel from "@/components/LocationPanel";
import NavigationBar from "@/components/NavigationBar";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dharma");
  const { currentCharacter, progress, visitedCharacters, totalCharacters } = useCharacterNavigation();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Enhanced Cyberpunk Background */}
      <div className="fixed inset-0">
        <img 
          src="/lovable-uploads/35b517d3-6624-44af-bef8-df7dab2fd142.png" 
          alt="Mystical background" 
          className="w-full h-full object-cover opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-cyan-900/30 to-purple-900/40"></div>
        
        {/* Dynamic Grid Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 cyberpunk-grid"></div>
        </div>

        {/* Scanning Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/80 to-transparent animate-pulse scanning-line"></div>
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse"></div>
          <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header - Responsive */}
        <header className="flex-shrink-0 p-4 lg:p-6 bg-black/60 backdrop-blur-xl border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center relative">
                  <Cpu className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-50 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono tracking-wider">
                    TECHNO SUTRA
                  </h1>
                  <div className="text-xs lg:text-sm font-mono text-cyan-300 tracking-widest">STEM ARRAY PROTOCOL</div>
                </div>
              </div>
              
              {/* Progress in Header for Mobile */}
              <div className="flex items-center gap-4">
                <div className="hidden lg:block">
                  <Badge variant="outline" className="border-cyan-400/70 text-cyan-300 bg-cyan-500/20 backdrop-blur-sm font-mono">
                    CAP. {String(currentCharacter.id).padStart(2, '0')} / {totalCharacters}
                  </Badge>
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center relative">
                  <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-50 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Mobile Progress Bar */}
            <div className="lg:hidden">
              <div className="flex justify-between text-xs text-cyan-300/80 mb-2 font-mono">
                <span>PROGRESSO: {Math.round(progress)}%</span>
                <span>CAP. {currentCharacter.id}/{totalCharacters}</span>
              </div>
              <Progress value={progress} className="h-2 bg-black/50 border border-cyan-500/30" />
            </div>
          </div>
        </header>

        {/* Main Content - Responsive Grid */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-full">
              
              {/* Left Sidebar - Gallery */}
              <div className="lg:col-span-3 order-3 lg:order-1">
                <Card className="h-full bg-black/40 border-cyan-500/30 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-500/10">
                  <div className="p-4 border-b border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <h3 className="font-bold text-cyan-300 text-sm font-mono">BODHISATTVAS</h3>
                    </div>
                  </div>
                  <div className="h-full overflow-hidden">
                    <BodhisattvaGallery />
                  </div>
                </Card>
              </div>

              {/* Center - 3D Model Display */}
              <div className="lg:col-span-6 order-1 lg:order-2 h-64 lg:h-full">
                <CharacterDisplay />
              </div>

              {/* Right Sidebar - Info Panels */}
              <div className="lg:col-span-3 order-2 lg:order-3 space-y-4">
                
                {/* Progress Card - Hidden on Mobile */}
                <div className="hidden lg:block">
                  <Card className="bg-black/40 border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-cyan-300 text-sm font-mono">PROGRESSO</h3>
                          <p className="text-xs text-cyan-400/70 font-mono">DHARMA PATH</p>
                        </div>
                      </div>
                      
                      <Progress value={progress} className="mb-3 h-2 bg-black/50 border border-cyan-500/30" />
                      <div className="flex justify-between text-xs text-cyan-300/80 mb-2 font-mono">
                        <span>CAPÍTULO {currentCharacter.id}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <p className="text-xs text-cyan-400/90 font-mono">📡 GANDAVYUHA SUTRA</p>
                    </div>
                  </Card>
                </div>

                {/* Teaching Panel */}
                <Card className="bg-black/40 border-blue-500/40 backdrop-blur-xl shadow-xl shadow-blue-500/10">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <h3 className="font-bold text-blue-300 text-sm font-mono">ENSINAMENTO</h3>
                    </div>
                    <TeachingPanel />
                  </div>
                </Card>

                {/* Location Panel */}
                <Card className="bg-black/40 border-purple-500/40 backdrop-blur-xl shadow-xl shadow-purple-500/10">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <h3 className="font-bold text-purple-300 text-sm font-mono">LOCAL SAGRADO</h3>
                    </div>
                    <LocationPanel />
                  </div>
                </Card>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex-shrink-0">
          <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
      </div>
    </div>
  );
};

export default Index;
