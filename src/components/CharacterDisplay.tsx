
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CharacterDisplay = () => {
  return (
    <Card className="h-full bg-gradient-to-b from-red-900/60 to-black/40 border-red-500/30 backdrop-blur-sm relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/c219c420-66d4-4e18-8ba6-e6667fac8aba.png" 
          alt="Buddhist deity background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 via-transparent to-black/60"></div>
      </div>

      {/* Sanskrit Text Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="text-center">
          <div className="text-gold/80 text-sm mb-2 font-sanskrit">॥ गण्डव्यूह सूत्र ॥</div>
          <Badge variant="outline" className="border-gold/50 text-gold bg-black/40">
            Capítulo 23 - A Sabedoria Perfeita
          </Badge>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
