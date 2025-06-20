import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Users, BookOpen, Sparkles, Eye } from 'lucide-react';
import { searchCharacters, getAvailableFilters, getCharacterStats, SearchFilters } from '@/data/characterUtils';
import { useNavigate } from 'react-router-dom';

const TeachersList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const availableFilters = useMemo(() => getAvailableFilters(), []);
  const stats = useMemo(() => getCharacterStats(), []);
  
  const searchResults = useMemo(() => {
    return searchCharacters(searchQuery, filters);
  }, [searchQuery, filters]);

  const handleViewCharacter = (characterId: number) => {
    navigate(`/?character=${characterId}`);
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-400/50';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              MESTRES SAGRADOS
            </h1>
            <BookOpen className="w-8 h-8 text-gold" />
          </div>
          <p className="text-cyan-400 font-mono mb-4">
            Explore os {stats.totalCharacters} mestres da tradição búdica
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-4 mb-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/50">
              {stats.withModels} com modelos 3D
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/50">
              {Object.keys(stats.byCategory).length} categorias
            </Badge>
            <Badge className="bg-gold/20 text-gold border-gold/50">
              {Math.round(stats.modelLoadRate)}% digitalizado
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-black/50 border-cyan-500/30 backdrop-blur-xl mb-6">
          <div className="p-4">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <Input
                  placeholder="Buscar mestres por nome, ensinamento, local..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-cyan-500/30 text-white placeholder-gray-400 font-mono"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-cyan-500/30">
                <Select onValueChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}>
                  <SelectTrigger className="bg-black/50 border-cyan-500/30 text-white">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-cyan-500/30">
                    <SelectItem value="">Todas</SelectItem>
                    {availableFilters.categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {getCategoryIcon(cat)} {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value || undefined }))}>
                  <SelectTrigger className="bg-black/50 border-cyan-500/30 text-white">
                    <SelectValue placeholder="Dificuldade" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-cyan-500/30">
                    <SelectItem value="">Todas</SelectItem>
                    {availableFilters.difficulties.map(diff => (
                      <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => setFilters(prev => ({ ...prev, hasModel: value === 'true' ? true : value === 'false' ? false : undefined }))}>
                  <SelectTrigger className="bg-black/50 border-cyan-500/30 text-white">
                    <SelectValue placeholder="Modelo 3D" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-cyan-500/30">
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="true">Com modelo 3D</SelectItem>
                    <SelectItem value="false">Sem modelo 3D</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => {
                    setFilters({});
                    setSearchQuery('');
                  }}
                  variant="outline"
                  className="border-red-500/50 text-red-300 hover:bg-red-500/20"
                >
                  Limpar
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-cyan-400 font-mono text-sm">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map(({ character, relevanceScore, matchedFields }) => (
            <Card
              key={character.id}
              className="bg-black/40 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
              onClick={() => handleViewCharacter(character.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(character.category || 'other')}</span>
                    <div>
                      <h3 className="font-semibold text-white font-mono">{character.name}</h3>
                      <p className="text-xs text-cyan-400 font-mono">{character.occupation}</p>
                    </div>
                  </div>
                  {character.glbStatus && (
                    <Eye className="w-4 h-4 text-green-400" />
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                  {character.description || character.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {character.difficulty && (
                    <Badge className={`text-xs font-mono ${getDifficultyColor(character.difficulty)}`}>
                      {character.difficulty}
                    </Badge>
                  )}
                  {character.keywords?.slice(0, 2).map(keyword => (
                    <Badge key={keyword} variant="outline" className="text-xs border-purple-400/50 text-purple-300">
                      {keyword}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400 font-mono">
                    Capítulo {character.id}
                  </p>
                  {relevanceScore > 1 && (
                    <div className="flex gap-1">
                      {matchedFields.map(field => (
                        <Sparkles key={field} className="w-3 h-3 text-gold" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 font-mono"
          >
            ← Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeachersList;
