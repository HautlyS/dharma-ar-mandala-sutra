
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CharacterDisplay = () => {
  return (
    <Card className="h-full bg-gradient-to-b from-red-900/60 to-black/40 border-red-500/30 backdrop-blur-sm relative overflow-hidden">
      {/* Mandala Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-gradient-radial from-red-600/40 via-red-800/20 to-transparent">
          <div className="w-full h-full rounded-full border-4 border-gold/30 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full border-2 border-red-400/40 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-gold/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Golden Halo */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-radial from-gold/40 to-transparent animate-pulse"></div>
          
          {/* Character Figure */}
          <div className="w-32 h-80 bg-gradient-to-b from-blue-900 to-blue-800 rounded-t-full relative shadow-2xl">
            {/* Robes */}
            <div className="absolute bottom-0 w-40 h-40 bg-gradient-to-b from-blue-800 to-blue-900 rounded-b-lg transform -translate-x-4"></div>
            
            {/* Arms */}
            <div className="absolute top-20 -left-6 w-8 h-24 bg-blue-800 rounded-full"></div>
            <div className="absolute top-20 -right-6 w-8 h-24 bg-blue-800 rounded-full"></div>
            
            {/* Sacred Symbol on Chest */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gold/60 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gold rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sanskrit Text Overlay */}
      <div className="absolute top-4 left-4 right-4">
        <div className="text-center">
          <div className="text-gold/80 text-sm mb-2 font-sanskrit">॥ गण्डव्यूह सूत्र ॥</div>
          <Badge variant="outline" className="border-gold/50 text-gold bg-black/40">
            Capítulo 23 - A Sabedoria Perfeita
          </Badge>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold/60 rounded-full animate-float"
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
