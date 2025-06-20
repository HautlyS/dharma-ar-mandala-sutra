import { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { searchCharacters, SearchResult } from '@/data/characterUtils';
import { Character } from '@/data/characters';

interface SearchBarProps {
  onCharacterSelect: (character: Character) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ onCharacterSelect, placeholder = "Buscar mestres...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        const searchResults = searchCharacters(query);
        setResults(searchResults.slice(0, 8)); // Limit to 8 results
        setIsOpen(true);
        setSelectedIndex(-1);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev <= 0 ? results.length - 1 : prev - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleSelect(results[selectedIndex].character);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (character: Character) => {
    onCharacterSelect(character);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
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

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-400/30 text-yellow-200 font-semibold">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="pl-10 pr-10 bg-black/50 border-cyan-500/30 text-white placeholder-gray-400 font-mono focus:border-cyan-400/60 focus:ring-cyan-400/20"
        />
        {query && (
          <Button
            size="sm"
            variant="ghost"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 text-gray-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-black/90 border-cyan-500/30 backdrop-blur-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="flex items-center gap-2 mb-2 px-2">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-cyan-400 font-mono">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {results.map((result, index) => (
              <div
                key={result.character.id}
                onClick={() => handleSelect(result.character)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  index === selectedIndex 
                    ? 'bg-cyan-500/20 border border-cyan-400/50' 
                    : 'hover:bg-cyan-500/10 border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-lg flex-shrink-0">
                    {getCategoryIcon(result.character.category || 'other')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white font-mono text-sm truncate">
                        {highlightMatch(result.character.name, query)}
                      </h4>
                      <Badge variant="outline" className="text-xs border-cyan-400/50 text-cyan-300 flex-shrink-0">
                        {result.character.id}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-400 font-mono mb-1">
                      {highlightMatch(result.character.occupation, query)}
                    </p>
                    
                    {result.character.significance && (
                      <p className="text-xs text-purple-400 truncate">
                        {highlightMatch(result.character.significance, query)}
                      </p>
                    )}
                    
                    {result.matchedFields.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {result.matchedFields.slice(0, 3).map(field => (
                          <Badge 
                            key={field} 
                            variant="outline" 
                            className="text-xs border-yellow-400/50 text-yellow-300"
                          >
                            {field}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {result.character.glbStatus && (
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-black/90 border-cyan-500/30 backdrop-blur-xl z-50">
          <div className="p-4 text-center">
            <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400 font-mono text-sm">
              Nenhum mestre encontrado para "{query}"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Tente buscar por nome, ocupação ou ensinamento
            </p>
          </div>
        </Card>
      )}

      {/* Search Tips */}
      {isOpen && !query && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-black/90 border-cyan-500/30 backdrop-blur-xl z-50">
          <div className="p-4">
            <h4 className="text-sm font-mono text-cyan-400 mb-2">Dicas de Busca</h4>
            <div className="space-y-1 text-xs text-gray-400">
              <p>• Digite o nome do mestre (ex: "Manjushri")</p>
              <p>• Busque por ocupação (ex: "Bodhisattva")</p>
              <p>• Procure por ensinamentos (ex: "sabedoria")</p>
              <p>• Use ↑↓ para navegar, Enter para selecionar</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
