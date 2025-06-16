
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dharma, Lotus, Om } from "lucide-react";
import CharacterDisplay from "@/components/CharacterDisplay";
import BodhisattvaGallery from "@/components/BodhisattvaGallery";
import TeachingPanel from "@/components/TeachingPanel";
import LocationPanel from "@/components/LocationPanel";
import MeditationPanel from "@/components/MeditationPanel";
import NavigationBar from "@/components/NavigationBar";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dharma");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-blue-900 text-white overflow-hidden">
      {/* Background Mandala Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="mandala" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Ccircle cx="50" cy="50" r="40" fill="none" stroke="red" stroke-width="1" opacity="0.3"/%3E%3Ccircle cx="50" cy="50" r="25" fill="none" stroke="gold" stroke-width="1" opacity="0.3"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23mandala)"/%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="p-4 text-center border-b border-gold/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Om className="w-6 h-6 text-gold animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gold to-red-400 bg-clip-text text-transparent">
              Gandavyuha Sutra
            </h1>
            <Om className="w-6 h-6 text-gold animate-pulse" />
          </div>
          <Badge variant="outline" className="border-red-500 text-red-300">
            QR Escaneado - Parque das Águas
          </Badge>
        </header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-12 gap-4 p-4">
          {/* Left Sidebar - Bodhisattva Gallery */}
          <div className="col-span-3">
            <BodhisattvaGallery />
          </div>

          {/* Center - Character Display */}
          <div className="col-span-6">
            <CharacterDisplay />
          </div>

          {/* Right Sidebar - Info Panels */}
          <div className="col-span-3 space-y-4">
            {/* Progress Panel */}
            <Card className="bg-black/40 border-gold/30 backdrop-blur-sm">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Dharma className="w-5 h-5 text-gold" />
                  <h3 className="font-semibold text-gold">Caminho de Sudhana</h3>
                </div>
                <Progress value={42} className="mb-2" />
                <p className="text-sm text-gray-300">23 de 55 Conexões</p>
                <p className="text-xs text-gray-400">Águas da Prata - SP</p>
                
                <div className="flex gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center">
                    <span className="text-xs">S</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold flex items-center justify-center">
                    <span className="text-xs">M</span>
                  </div>
                </div>
              </div>
            </Card>

            <TeachingPanel />
            <LocationPanel />
            <MeditationPanel />
          </div>
        </div>

        {/* Bottom Navigation */}
        <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </div>
  );
};

export default Index;
