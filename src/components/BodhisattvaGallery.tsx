
import { Card } from "@/components/ui/card";
import { Flower } from "lucide-react";

const bodhisattvas = [
  { name: "Avalokiteshvara", description: "Compaixão", color: "from-blue-500 to-blue-700", active: true },
  { name: "Samantabhadra", description: "Ação", color: "from-green-500 to-green-700", active: false },
  { name: "Vairocana", description: "Luz", color: "from-yellow-500 to-orange-600", active: false },
  { name: "Manjushri", description: "Sabedoria", color: "from-purple-500 to-purple-700", active: false },
];

const BodhisattvaGallery = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-white mb-1">Mestres</h3>
        <p className="text-xs text-gray-400">55 Bodhisattvas</p>
      </div>

      <div className="space-y-3">
        {bodhisattvas.map((bodhisattva, index) => (
          <Card
            key={index}
            className={`bg-black/40 backdrop-blur-md border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group ${
              bodhisattva.active ? 'border-gold/50 bg-gold/10' : ''
            }`}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${bodhisattva.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <Flower className="w-5 h-5 text-white/90" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white mb-1">
                    {bodhisattva.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {bodhisattva.description}
                  </p>
                </div>
                {bodhisattva.active && (
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* More indicator */}
      <Card className="bg-black/20 border-dashed border-white/20 backdrop-blur-md">
        <div className="p-4 text-center">
          <p className="text-xs text-gray-400">+51 outros mestres</p>
          <div className="flex justify-center mt-2 gap-1">
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BodhisattvaGallery;
