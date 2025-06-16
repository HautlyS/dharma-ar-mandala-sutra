
import { Dharma, Lotus, Om } from "lucide-react";

interface NavigationBarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavigationBar = ({ activeSection, setActiveSection }: NavigationBarProps) => {
  const navItems = [
    { id: "dharma", icon: Dharma, label: "Dharma", sublabel: "Ensinamentos" },
    { id: "trilha", icon: ({ className }: { className: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 6C8 7.1 7.1 8 6 8S4 7.1 4 6 4.9 4 6 4 8 4.9 8 6ZM11 8C11 9.1 10.1 10 9 10S7 9.1 7 8 7.9 6 9 6 11 6.9 11 8ZM14 10C14 11.1 13.1 12 12 12S10 11.1 10 10 10.9 8 12 8 14 8.9 14 10ZM17 12C17 13.1 16.1 14 15 14S13 13.1 13 12 13.9 10 15 10 17 10.9 17 12ZM20 14C20 15.1 19.1 16 18 16S16 15.1 16 14 16.9 12 18 12 20 12.9 20 14Z" />
      </svg>
    ), label: "Trilha", sublabel: "Peregrinação" },
    { id: "sangha", icon: Lotus, label: "Sangha", sublabel: "Comunidade" },
    { id: "sadhana", icon: Om, label: "Sadhana", sublabel: "Práticas" },
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
