import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Cube, Download, Eye, Grid3X3, List, Info } from 'lucide-react';
import { getCharactersWithModels, searchCharacters } from '@/data/characterUtils';
import { useModelCache } from '@/hooks/useModelCache';
import ModelViewer from '@/components/ModelViewer';
import { useNavigate } from 'react-router-dom';

const Gallery3D = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { stats } = useModelCache();

  const charactersWithModels = useMemo(() => getCharactersWithModels(), []);
  
  const filteredCharacters = useMemo(() => {
    if (!searchQuery) return charactersWithModels;
    
    const results = searchCharacters(searchQuery, { hasModel: true });
    return results.map(result => result.character);
  }, [searchQuery, charactersWithModels]);

  const selectedCharacter = selectedModel 
    ? charactersWithModels.find(c => c.id === selectedModel)
    : null;

  const handleDownloadModel = async (modelUrl: string, characterName: string) => {
    try {
      const response = await fetch(modelUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${characterName.replace(/\s+/g, '_')}_model.glb`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download model:', error);
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
            <Cube className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              GALERIA 3D
            </h1>
            <Eye className="w-8 h-8 text-gold" />
          </div>
          <p className="text-cyan-400 font-mono mb-4">
            Explore {charactersWithModels.length} modelos 3D interativos dos mestres sagrados
          </p>
          
          {/* Cache Stats */}
          {stats.entryCount > 0 && (
            <div className="flex justify-center gap-4 mb-6">
              <Badge className="bg-green-500/20 text-green-300 border-green-400/50">
                Cache: {Math.round(stats.hitRate * 100)}% hit rate
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/50">
                {stats.entryCount} modelos em cache
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/50">
                {Math.round(stats.totalSize / 1024 / 1024)}MB armazenado
              </Badge>
            </div>
          )}
        </div>

        {/* Search and Controls */}
        <Card className="bg-black/50 border-cyan-500/30 backdrop-blur-xl mb-6">
          <div className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <Input
                  placeholder="Buscar modelos 3D..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-cyan-500/30 text-white placeholder-gray-400 font-mono"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  className="border-cyan-500/50 text-cyan-300"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  className="border-cyan-500/50 text-cyan-300"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-cyan-500/30">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Galeria
            </TabsTrigger>
            <TabsTrigger value="viewer" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Visualizador
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            <div className="mb-4">
              <p className="text-cyan-400 font-mono text-sm">
                {filteredCharacters.length} modelo{filteredCharacters.length !== 1 ? 's' : ''} disponível{filteredCharacters.length !== 1 ? 'eis' : ''}
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCharacters.map(character => (
                  <Card
                    key={character.id}
                    className="bg-black/40 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                    onClick={() => setSelectedModel(character.id)}
                  >
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                      <ModelViewer
                        modelUrl={character.modelUrl}
                        characterName={character.name}
                        priority="low"
                      />
                      <div className="absolute bottom-2 left-2 right-2 z-20">
                        <h3 className="font-semibold text-white font-mono text-sm truncate">
                          {character.name}
                        </h3>
                        <p className="text-xs text-cyan-400 font-mono">
                          Capítulo {character.id}
                        </p>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs border-cyan-400/50 text-cyan-300">
                          {character.occupation}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/?character=${character.id}`);
                            }}
                            className="w-6 h-6 p-0 text-cyan-400 hover:text-cyan-300"
                          >
                            <Info className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadModel(character.modelUrl, character.name);
                            }}
                            className="w-6 h-6 p-0 text-green-400 hover:text-green-300"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCharacters.map(character => (
                  <Card
                    key={character.id}
                    className="bg-black/40 border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedModel(character.id)}
                  >
                    <div className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ModelViewer
                          modelUrl={character.modelUrl}
                          characterName={character.name}
                          priority="low"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white font-mono mb-1">
                          {character.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-2">
                          {character.description || character.summary}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs border-cyan-400/50 text-cyan-300">
                            Capítulo {character.id}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-300">
                            {character.occupation}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/?character=${character.id}`);
                          }}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadModel(character.modelUrl, character.name);
                          }}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="viewer" className="mt-6">
            {selectedCharacter ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-black/40 border-cyan-500/30">
                    <div className="aspect-video">
                      <ModelViewer
                        modelUrl={selectedCharacter.modelUrl}
                        characterName={selectedCharacter.name}
                        priority="high"
                      />
                    </div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="bg-black/40 border-cyan-500/30 p-4">
                    <h3 className="font-semibold text-white font-mono mb-2">
                      {selectedCharacter.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      {selectedCharacter.description || selectedCharacter.summary}
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-cyan-400/50 text-cyan-300">
                        {selectedCharacter.occupation}
                      </Badge>
                      <p className="text-xs text-gray-400">
                        {selectedCharacter.locationDescription}
                      </p>
                    </div>
                  </Card>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/?character=${selectedCharacter.id}`)}
                      className="flex-1 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 font-mono"
                    >
                      Ver Detalhes
                    </Button>
                    <Button
                      onClick={() => handleDownloadModel(selectedCharacter.modelUrl, selectedCharacter.name)}
                      variant="outline"
                      className="border-green-400/50 text-green-300 hover:bg-green-500/20"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Cube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 font-mono">
                  Selecione um modelo 3D da galeria para visualizar
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

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

export default Gallery3D;
