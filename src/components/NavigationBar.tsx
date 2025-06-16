
import { Compass, Flower, Circle, Footprints } from "lucide-react";

interface NavigationBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavigationBar = ({ activeSection, setActiveSection }: NavigationBarProps) => {
  const navItems = [
    { id: "dharma", icon: Compass, label: "Dharma", sublabel: "Ensinamentos" },
    { id: "trilha", icon: Footprints, label: "Trilha", sublabel: "Peregrinação" },
    { id: "sangha", icon: Flower, label: "Sangha", sublabel: "Comunidade" },
    { id: "sadhana", icon: Circle, label: "Sadhana", sublabel: "Práticas" },
  ];

  return (
    <div className="bg-black/60 backdrop-blur-sm border-t border-gold/20 p-4">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center space-y-1 transition-all duration-300 ${
                isActive 
                  ? "text-gold scale-110" 
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className={`p-2 rounded-full transition-all ${
                isActive ? "bg-gold/20" : "hover:bg-white/10"
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium">{item.label}</p>
                <p className="text-xs opacity-70">{item.sublabel}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
