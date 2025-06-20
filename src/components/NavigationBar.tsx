
import { Compass, Flower, Circle, Footprints, Users, Cube, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavigationBar = ({ activeSection, setActiveSection }: NavigationBarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: "dharma", icon: Compass, label: "Dharma", action: () => setActiveSection("dharma") },
    { id: "teachers", icon: Users, label: "Mestres", action: () => navigate("/teachers") },
    { id: "gallery", icon: Cube, label: "3D", action: () => navigate("/gallery") },
    { id: "about", icon: Info, label: "Sobre", action: () => navigate("/about") },
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
              onClick={item.action}
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
