
import { Compass, Flower, Circle, Footprints } from "lucide-react";

interface NavigationBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavigationBar = ({ activeSection, setActiveSection }: NavigationBarProps) => {
  const navItems = [
    { id: "dharma", icon: Compass, label: "Dharma" },
    { id: "trilha", icon: Footprints, label: "Trilha" },
    { id: "sangha", icon: Flower, label: "Sangha" },
    { id: "sadhana", icon: Circle, label: "Práticas" },
  ];

  return (
    <div className="bg-black/60 backdrop-blur-md border-t border-white/10 p-4">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center space-y-2 transition-all duration-300 ${
                isActive 
                  ? "text-gold scale-110" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className={`p-3 rounded-full transition-all ${
                isActive 
                  ? "bg-gold/20 border border-gold/50" 
                  : "hover:bg-white/10"
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium">{item.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationBar;
