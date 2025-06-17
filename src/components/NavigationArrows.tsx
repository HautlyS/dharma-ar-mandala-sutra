
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCharacters: number;
}

const NavigationArrows = ({ onPrevious, onNext, currentIndex, totalCharacters }: NavigationArrowsProps) => {
  return (
    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-20">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="pointer-events-auto ml-4 bg-black/40 hover:bg-black/60 border border-white/20 text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      
      <div className="text-center pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 border border-white/10">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} de {totalCharacters}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="pointer-events-auto mr-4 bg-black/40 hover:bg-black/60 border border-white/20 text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default NavigationArrows;
