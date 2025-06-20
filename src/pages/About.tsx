import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Cube, 
  Heart, 
  Star, 
  Globe, 
  Code, 
  Zap,
  Github,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCharacterStats } from '@/data/characterUtils';
import { useMemo } from 'react';

const About = () => {
  const navigate = useNavigate();
  const stats = useMemo(() => getCharacterStats(), []);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "56 Mestres Sagrados",
      description: "Explore a jornada completa de Sudhana através dos ensinamentos de 56 mestres espirituais únicos."
    },
    {
      icon: <Cube className="w-6 h-6" />,
      title: "Modelos 3D Interativos",
      description: "Visualize os mestres em realidade aumentada com modelos 3D otimizados e interativos."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Ensinamentos Profundos",
      description: "Acesse ensinamentos autênticos, práticas e sabedoria de cada mestre da tradição."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Otimizada",
      description: "Sistema de cache inteligente e carregamento otimizado para experiência fluida."
    }
  ];

  const technologies = [
    { name: "React 18", description: "Interface moderna e reativa" },
    { name: "TypeScript", description: "Tipagem estática para maior confiabilidade" },
    { name: "Vite", description: "Build tool rápido e eficiente" },
    { name: "Tailwind CSS", description: "Estilização utilitária e responsiva" },
    { name: "Model Viewer", description: "Visualização 3D otimizada" },
    { name: "Shadcn/ui", description: "Componentes UI modernos" }
  ];

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

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-10 h-10 text-gold animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
              TECHNO SUTRA
            </h1>
            <Heart className="w-10 h-10 text-red-400 animate-pulse" />
          </div>
          <p className="text-xl text-cyan-400 font-mono mb-4">
            STEM ARRAY • SUDHANA'S QUANTUM QUEST
          </p>
          <div className="text-gold/60 text-lg font-sanskrit">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </div>
          <p className="text-sm text-gray-400 mt-2">
            "Que todos os seres sejam felizes, que todos sejam livres de doenças"
          </p>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-cyan-500/30 mb-8">
            <TabsTrigger value="about" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Sobre
            </TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Recursos
            </TabsTrigger>
            <TabsTrigger value="tech" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Tecnologia
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
              Estatísticas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                O Projeto
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  O <strong className="text-cyan-400">Techno Sutra</strong> é uma experiência digital imersiva que combina 
                  tecnologia de ponta com sabedoria milenar budista. Baseado no clássico 
                  <em className="text-purple-400"> Gaṇḍavyūha Sūtra</em>, o projeto apresenta a jornada 
                  espiritual de Sudhana através de 56 mestres sagrados.
                </p>
                <p>
                  Cada mestre é apresentado com modelos 3D interativos, ensinamentos autênticos, 
                  e informações detalhadas sobre suas práticas e significado espiritual. 
                  A interface cyberpunk-espiritual cria uma ponte única entre o antigo e o moderno.
                </p>
                <p>
                  Este é mais que um aplicativo - é uma ferramenta de transformação pessoal, 
                  um museu digital da sabedoria budista, e uma demonstração de como a tecnologia 
                  pode servir ao despertar espiritual.
                </p>
              </div>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                A Jornada de Sudhana
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Sudhana, cujo nome significa "Boa Riqueza", é um jovem buscador espiritual 
                  que empreende uma jornada extraordinária em busca da iluminação. Guiado pelo 
                  bodhisattva Mañjuśrī, ele visita 53 mestres espirituais, cada um oferecendo 
                  ensinamentos únicos e perspectivas sobre o caminho búdico.
                </p>
                <p>
                  Sua jornada representa o caminho universal do despertar - desde os primeiros 
                  passos na busca espiritual até a realização final da natureza búdica. 
                  Cada encontro é uma lição sobre diferentes aspectos da prática e realização espiritual.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-black/40 border-cyan-500/30 backdrop-blur-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-cyan-400 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 font-mono">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-black/40 border-gold/30 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold text-gold mb-4 font-mono">
                Recursos Avançados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-cyan-400 font-mono">Interface</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Design responsivo cyberpunk-espiritual</li>
                    <li>• Navegação intuitiva e fluida</li>
                    <li>• Animações e efeitos visuais</li>
                    <li>• Suporte a temas escuros</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-purple-400 font-mono">Funcionalidades</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Busca e filtros avançados</li>
                    <li>• Sistema de favoritos</li>
                    <li>• Progresso de jornada</li>
                    <li>• Compartilhamento social</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tech" className="space-y-6">
            <Card className="bg-black/40 border-green-500/30 backdrop-blur-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                Stack Tecnológico
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="bg-black/30 rounded-lg p-4 border border-green-400/30">
                    <h3 className="text-green-400 font-mono font-semibold mb-1">
                      {tech.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-black/40 border-blue-500/30 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4 font-mono">
                Arquitetura e Performance
              </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="text-cyan-400 font-mono mb-2">Cache Inteligente</h4>
                  <p className="text-sm">
                    Sistema de cache avançado para modelos 3D com estratégias LRU e 
                    precarregamento inteligente baseado na navegação do usuário.
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-mono mb-2">Otimização 3D</h4>
                  <p className="text-sm">
                    Modelos GLB otimizados com compressão Draco, carregamento progressivo 
                    e renderização eficiente via Model Viewer.
                  </p>
                </div>
                <div>
                  <h4 className="text-gold font-mono mb-2">Responsividade</h4>
                  <p className="text-sm">
                    Interface totalmente responsiva com breakpoints otimizados para 
                    desktop, tablet e mobile, mantendo a experiência visual consistente.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-xl p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2 font-mono">
                  {stats.totalCharacters}
                </div>
                <div className="text-gray-300 text-sm">Mestres Sagrados</div>
              </Card>
              
              <Card className="bg-black/40 border-green-500/30 backdrop-blur-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2 font-mono">
                  {stats.withModels}
                </div>
                <div className="text-gray-300 text-sm">Modelos 3D</div>
              </Card>
              
              <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2 font-mono">
                  {Math.round(stats.modelLoadRate)}%
                </div>
                <div className="text-gray-300 text-sm">Digitalização</div>
              </Card>
            </div>

            <Card className="bg-black/40 border-gold/30 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold text-gold mb-4 font-mono">
                Distribuição por Categoria
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(stats.byCategory).map(([category, count]) => (
                  <div key={category} className="bg-black/30 rounded-lg p-3 border border-gold/30">
                    <div className="text-gold font-mono font-semibold capitalize">
                      {category}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-black/40 border-red-500/30 backdrop-blur-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-4 font-mono">
                Níveis de Dificuldade
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
                  <div key={difficulty} className="flex items-center justify-between">
                    <Badge className={`capitalize ${
                      difficulty === 'beginner' ? 'bg-green-500/20 text-green-300 border-green-400/50' :
                      difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50' :
                      'bg-red-500/20 text-red-300 border-red-400/50'
                    }`}>
                      {difficulty}
                    </Badge>
                    <span className="text-white font-mono font-bold">
                      {count} mestres
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 font-mono"
          >
            ← Voltar ao Início
          </Button>
          
          <Button
            onClick={() => navigate('/teachers')}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 font-mono"
          >
            <Users className="w-4 h-4 mr-2" />
            Explorar Mestres
          </Button>
          
          <Button
            onClick={() => navigate('/gallery')}
            className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/50 text-green-300 hover:from-green-500/30 hover:to-blue-500/30 font-mono"
          >
            <Cube className="w-4 h-4 mr-2" />
            Galeria 3D
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
