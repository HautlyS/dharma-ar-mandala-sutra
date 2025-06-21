
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flower, CheckCircle, XCircle, Lotus, Crown, Search, Filter, X, Star } from "lucide-react";
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'buddha': return '🧘';
      case 'bodhisattva': return '🌸';
      case 'arhat': return '⚡';
      case 'deva': return '✨';
      case 'human': return '👤';
      default: return '🔮';
    }
  };

  const getCategoryColor = (occupation: string, category?: string) => {
    if (occupation === 'Buda' || category === 'buddha') return 'from-gold to-yellow-600';
    if (occupation === 'Bodhisattva' || category === 'bodhisattva') return 'from-cyan-500 to-purple-600';
    if (occupation === 'Arhat' || category === 'arhat') return 'from-orange-500 to-red-600';
    if (occupation === 'Monge' || occupation === 'Freira') return 'from-orange-400 to-orange-600';
    if (occupation === 'Deva (divindade)' || category === 'deva') return 'from-purple-500 to-pink-600';
    return 'from-green-500 to-blue-600';
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Enhanced Header with Search */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-lg p-4 border border-cyan-500/30 backdrop-blur-xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Crown className="w-5 h-5 text-gold animate-pulse" />
          <h3 className="font-semibold text-white text-lg font-mono neon-text">MESTRES SAGRADOS</h3>
          <Star className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        
        <div className="text-center mb-3">
          <p className="text-xs text-cyan-400 font-mono mb-1">
            {filteredCharacters.length} DE {characters.length} MESTRES DISPONÍVEIS
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono">
            <span className="text-green-400">{characters.filter(c => c.glbStatus).length} MODELOS 3D</span>
            <span className="text-blue-400">{characters.filter(c => c.category === 'buddha').length} BUDAS</span>
            <span className="text-purple-400">{characters.filter(c => c.category === 'bodhisattva').length} BODHISATTVAS</span>
          </div>
          <div className="text-gold/60 text-xs font-sanskrit mt-2">॥ सर्वे भवन्तु सुखिनः ॥</div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-cyan-400 z-10" />
            <Input
              placeholder="Buscar por nome, ensinamento, local..."
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
              className="flex-1 h-7 text-xs border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 font-mono"
            >
              <Filter className="w-3 h-3 mr-1" />
              FILTROS {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
            </Button>
            {(searchQuery || Object.keys(filters).length > 0) && (
              <Button
                size="sm"
                variant="outline"
                onClick={clearFilters}
                className="h-7 text-xs border-red-500/50 text-red-300 hover:bg-red-500/20 font-mono"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 gap-2 pt-3 border-t border-cyan-500/30">
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}>
                <SelectTrigger className="h-7 text-xs bg-black/50 border-cyan-500/30 text-white font-mono">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-500/30">
                  <SelectItem value="">Todas as Categorias</SelectItem>
                  {availableFilters.categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-xs capitalize font-mono">
                      {getCategoryIcon(cat)} {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, hasModel: value === 'true' ? true : value === 'false' ? false : undefined }))}>
                <SelectTrigger className="h-7 text-xs bg-black/50 border-cyan-500/30 text-white font-mono">
                  <SelectValue placeholder="Modelo 3D" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-500/30">
                  <SelectItem value="" className="text-xs font-mono">Todos os Modelos</SelectItem>
                  <SelectItem value="true" className="text-xs font-mono">✅ Com Modelo 3D</SelectItem>
                  <SelectItem value="false" className="text-xs font-mono">❌ Sem Modelo 3D</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value || undefined }))}>
                <SelectTrigger className="h-7 text-xs bg-black/50 border-cyan-500/30 text-white font-mono">
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent className="bg-black border-cyan-500/30">
                  <SelectItem value="" className="text-xs font-mono">Todas as Dificuldades</SelectItem>
                  <SelectItem value="beginner" className="text-xs font-mono">🟢 Iniciante</SelectItem>
                  <SelectItem value="intermediate" className="text-xs font-mono">🟡 Intermediário</SelectItem>
                  <SelectItem value="advanced" className="text-xs font-mono">🔴 Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Teachers Grid - Scrollable */}
      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gradient max-h-[70vh]">
        {filteredCharacters.map((character) => (
          <Card
            key={character.id}
            onClick={() => onCharacterSelect(character.id)}
            className={`bg-black/40 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] ${
              character.id === currentCharacterId ? 
                'border-cyan-400/80 bg-cyan-500/10 shadow-cyan-500/30 scale-[1.02] ring-1 ring-cyan-400/50' : 
                ''
            }`}
          >
            <div className="p-3">
              <div className="flex items-center gap-3">
                {/* Avatar with Category Icon */}
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(character.occupation, character.category)} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-cyan-400/50`}>
                    <span className="text-lg">{getCategoryIcon(character.category || 'other')}</span>
                  </div>
                  {/* 3D Model Status */}
                  {character.glbStatus ? (
                    <CheckCircle className="w-4 h-4 text-green-400 absolute -top-1 -right-1 bg-black rounded-full" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 absolute -top-1 -right-1 bg-black rounded-full" />
                  )}
                  {/* Current Selection Indicator */}
                  {character.id === currentCharacterId && (
                    <div className="absolute -inset-1 bg-cyan-400/30 rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Character Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-1 rounded">
                      #{character.id.toString().padStart(2, '0')}
                    </span>
                    <h4 className="text-sm font-medium text-white font-mono truncate group-hover:text-cyan-300 transition-colors">
                      {character.name}
                    </h4>
                  </div>
                  <p className="text-xs text-cyan-400 font-mono truncate mb-1">
                    {character.occupation}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {character.significance}
                  </p>
                  
                  {/* Difficulty Badge */}
                  {character.difficulty && (
                    <Badge 
                      variant="outline" 
                      className={`mt-1 text-xs font-mono ${
                        character.difficulty === 'beginner' ? 'border-green-500/50 text-green-300' :
                        character.difficulty === 'intermediate' ? 'border-yellow-500/50 text-yellow-300' :
                        'border-red-500/50 text-red-300'
                      }`}
                    >
                      {character.difficulty === 'beginner' ? '🟢 Iniciante' :
                       character.difficulty === 'intermediate' ? '🟡 Intermediário' :
                       '🔴 Avançado'}
                    </Badge>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="text-right flex flex-col items-end gap-1">
                  {character.id === currentCharacterId && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  )}
                  {character.glbStatus && (
                    <span className="text-xs text-green-400 font-mono">3D</span>
                  )}
                </div>
              </div>
              
              {/* Liberation Teaching */}
              {character.liberacao && character.liberacao !== "-" && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-300 bg-purple-500/10 font-mono w-full justify-center truncate">
                    ⚡ {character.liberacao}
                  </Badge>
                </div>
              )}
              
              {/* Location */}
              {(character.location || character.locationDescription) && (
                <div className="mt-1 text-xs text-gray-500 font-mono truncate flex items-center gap-1">
                  <Lotus className="w-3 h-3" />
                  {character.location || character.locationDescription}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Enhanced Footer Stats */}
      <div className="bg-black/30 border border-cyan-500/30 backdrop-blur-xl rounded-lg p-3">
        <div className="text-center">
          <p className="text-xs text-cyan-400 font-mono mb-2">📖 JORNADA DE SUDHANA COMPLETA</p>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <div className="text-green-400">
              <div className="font-bold">{characters.filter(c => c.glbStatus).length}</div>
              <div>MODELOS 3D</div>
            </div>
            <div className="text-blue-400">
              <div className="font-bold">{filteredCharacters.length}</div>
              <div>MESTRES</div>
            </div>
            <div className="text-purple-400">
              <div className="font-bold">56</div>
              <div>CAPÍTULOS</div>
            </div>
          </div>
          <div className="text-gold/60 text-xs font-sanskrit mt-2">
            ॐ गते गते पारगते पारसंगते बोधि स्वाहा ॐ
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodhisattvaGallery;
