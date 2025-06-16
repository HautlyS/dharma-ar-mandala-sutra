
import { Card } from "@/components/ui/card";
import { Flower } from "lucide-react";

const bodhisattvas = [
  { name: "Avalokiteshvara", description: "Compaixão", color: "from-blue-600 to-blue-800" },
  { name: "Samantabhadra", description: "Ação Virtuosa", color: "from-green-600 to-green-800" },
  { name: "Vairocana", description: "Luz Universal", color: "from-gold to-yellow-600" },
  { name: "Manjushri", description: "Sabedoria", color: "from-orange-600 to-red-600" },
  { name: "Ksitigarbha", description: "Proteção", color: "from-purple-600 to-purple-800" },
  { name: "Akashagarbha", description: "Espaço Infinito", color: "from-indigo-600 to-blue-900" },
];

const BodhisattvaGallery = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flower className="w-5 h-5 text-gold" />
          <h3 className="font-semibold text-gold">Bodhisattvas</h3>
        </div>
        <p className="text-xs text-gray-400">55 Mestres do Sutra</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {bodhisattvas.map((bodhisattva, index) => (
          <Card
            key={index}
            className="bg-black/40 border-gold/20 backdrop-blur-sm hover:border-gold/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="p-3">
              <div className={`w-full h-16 bg-gradient-to-br ${bodhisattva.color} rounded-md mb-2 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Flower className="w-6 h-6 text-white/80" />
              </div>
              <h4 className="text-xs font-medium text-white mb-1 text-center">
                {bodhisattva.name}
              </h4>
              <p className="text-xs text-gray-400 text-center">
                {bodhisattva.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* More indicator */}
      <Card className="bg-black/40 border-dashed border-gold/30 backdrop-blur-sm">
        <div className="p-4 text-center">
          <p className="text-xs text-gray-400">+49 outros mestres</p>
          <div className="flex justify-center mt-2">
            <div className="w-2 h-2 bg-gold/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BodhisattvaGallery;
