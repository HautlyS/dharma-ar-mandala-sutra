
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CharacterDisplay = () => {
  return (
    <Card className="h-full bg-black/30 border-white/10 backdrop-blur-md relative overflow-hidden">
      {/* Main Character Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/c219c420-66d4-4e18-8ba6-e6667fac8aba.png" 
          alt="Buddhist deity"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Top Info Overlay */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="border-gold/50 text-gold bg-black/40 backdrop-blur-sm mb-2">
              Capítulo 23
            </Badge>
            <h2 className="text-2xl font-bold text-white mb-1">A Sabedoria Perfeita</h2>
            <p className="text-sm text-gray-300">Ensinamento Transcendental</p>
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
              <p className="text-gray-400 text-xs">Manjushri - Sabedoria</p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center">
                <span className="text-xs text-gold">M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
