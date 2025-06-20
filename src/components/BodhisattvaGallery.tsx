
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flower, CheckCircle, XCircle, Lotus, Crown, Search, Filter, X } from "lucide-react";
import { characters } from "@/data/characters";
import { searchCharacters, getAvailableFilters, SearchFilters } from "@/data/characterUtils";

interface BodhisattvaGalleryProps {
  currentCharacterId: number;
  onCharacterSelect: (id: number) => void;
}

const BodhisattvaGallery = ({ currentCharacterId, onCharacterSelect }: BodhisattvaGalleryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const availableFilters = useMemo(() => getAvailableFilters(), []);

  const filteredCharacters = useMemo(() => {
    if (!searchQuery && Object.keys(filters).length === 0) {
      return characters;
    }

    const results = searchCharacters(searchQuery, filters);
    return results.map(result => result.character);
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({});
    setShowFilters(false);
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Header with Search */}
      <div className="text-center mb-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-lg p-4 border border-cyan-500/30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-gold animate-pulse" />
          <h3 className="font-semibold text-white mb-1 font-mono text-lg neon-text">MESTRES SAGRADOS</h3>
          <Flower className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-xs text-cyan-400 font-mono">{filteredCharacters.length} DE {characters.length} MESTRES</p>
        <div className="text-gold/60 text-xs font-sanskrit mt-1">॥ सर्वे भवन्तु सुखिनः ॥</div>

        {/* Quick Search */}
        <div className="mt-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-cyan-400" />
            <Input
              placeholder="Buscar mestres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-8 h-8 text-xs bg-black/50 border-cyan-500/30 text-white placeholder-gray-400 font-mono"
            />
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSearchQuery('')}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 w-5 h-5 p-0 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 h-7 text-xs border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
            >
              <Filter className="w-3 h-3 mr-1" />
              Filtros
            </Button>
            {(searchQuery || Object.keys(filters).length > 0) && (
              <Button
                size="sm"
                variant="outline"
                onClick={clearFilters}
                className="h-7 text-xs border-red-500/50 text-red-300 hover:bg-red-500/20"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cyan-500/30">
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}>
                <SelectTrigger className="h-7 text-xs bg-black/50 border-cyan-500/30 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-500/30">
                  <SelectItem value="">Todas</SelectItem>
                  {availableFilters.categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-xs capitalize">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, hasModel: value === 'true' ? true : value === 'false' ? false : undefined }))}>
                <SelectTrigger className="h-7 text-xs bg-black/50 border-cyan-500/30 text-white">
                  <SelectValue placeholder="Modelo 3D" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-500/30">
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="true" className="text-xs">Com 3D</SelectItem>
                  <SelectItem value="false" className="text-xs">Sem 3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* All Characters Display */}
      <div className="space-y-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gradient">
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            onClick={() => onCharacterSelect(character.id)}
            className={`bg-black/40 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] ${
              character.id === currentCharacterId ? 'border-cyan-400/80 bg-cyan-500/10 shadow-cyan-500/30 scale-[1.02]' : ''
            }`}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    character.occupation === 'Buda' ? 'from-gold to-yellow-600' :
                    character.occupation === 'Bodhisattva' ? 'from-cyan-500 to-purple-600' :
                    character.occupation === 'Arhat' ? 'from-orange-500 to-red-600' :
                    character.occupation === 'Monge' ? 'from-orange-400 to-orange-600' :
                    character.occupation === 'Freira' ? 'from-pink-500 to-purple-600' :
                    'from-green-500 to-blue-600'
                  } rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-cyan-400/50`}>
                    <Flower className="w-5 h-5 text-white/90" />
                  </div>
                  {character.glbStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 absolute -top-1 -right-1" />
                  )}
                  {character.id === currentCharacterId && (
                    <div className="absolute -inset-1 bg-cyan-400/30 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400">{character.id.toString().padStart(2, '0')}</span>
                    <h4 className="text-sm font-medium text-white font-mono truncate">
                      {character.name}
                    </h4>
                  </div>
                  <p className="text-xs text-cyan-400 font-mono truncate">
                    {character.occupation}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {character.significance}
                  </p>
                </div>
                <div className="text-right">
                  {character.id === currentCharacterId && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
              
              {/* Liberation Teaching Badge */}
              {character.liberacao && character.liberacao !== "-" && (
                <Badge variant="outline" className="mt-2 text-xs border-purple-500/50 text-purple-300 bg-purple-500/10 font-mono w-full justify-center truncate">
                  {character.liberacao}
                </Badge>
              )}
              
              {/* Location Info */}
              {(character.location || character.locationDescription) && (
                <div className="mt-1 text-xs text-gray-500 font-mono truncate">
                  📍 {character.location || character.locationDescription}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="bg-black/20 border border-cyan-500/30 backdrop-blur-xl rounded-lg p-3 text-center">
        <p className="text-xs text-cyan-400 font-mono mb-1">JORNADA COMPLETA</p>
        <div className="flex justify-center gap-2 text-xs font-mono">
          <span className="text-green-400">{filteredCharacters.filter(c => c.glbStatus).length} MODELOS 3D</span>
          <span className="text-gray-400">•</span>
          <span className="text-blue-400">{filteredCharacters.length} MESTRES</span>
        </div>
        <div className="text-gold/60 text-xs font-sanskrit mt-2">
          ॐ मणि पद्मे हूँ ॐ
        </div>
      </div>
    </div>
  );
};

export default BodhisattvaGallery;
