
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Edit3, Save, X } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useEditableContent } from "@/hooks/useEditableContent";

const TeachingPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateContent, getContent } = useEditableContent(currentCharacter.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  // Get teaching specific to current character
  const getDefaultTeaching = (character: any) => {
    const teachings = {
      1: "O despertar da consciência búdica através da compreensão da natureza da realidade.",
      2: "A prática das dez aspirações fundamentais do bodhisattva.",
      3: "A sabedoria transcendente que corta através de todas as ilusões.",
      4: "A beleza espiritual que surge da purificação da mente.",
      5: "A visão clara que percebe todos os fenômenos sem obstáculos.",
      6: "O estabelecimento firme na realização suprema.",
      7: "A generosidade que cobre todos os seres como uma nuvem benéfica.",
      8: "A liberação que manifesta a natureza búdica sem obstáculos.",
      9: "O estandarte da sabedoria que se ergue sobre o oceano do samsara.",
      10: "A esperança que conduz à felicidade suprema e permanente.",
      11: "A força espiritual que supera todos os obstáculos.",
      12: "A vitória contínua sobre as paixões e ilusões.",
      13: "A lembrança perfeita dos ensinamentos sagrados.",
      14: "A sabedoria eterna que ilumina todos os caminhos.",
      15: "O domínio dos sentidos através da sabedoria superior.",
      16: "A acumulação contínua de méritos através da prática.",
      17: "A riqueza espiritual que emana da mente purificada.",
      18: "A manifestação pura dos campos búdicos através da oração.",
      19: "As oferendas perfumadas que satisfazem todos os seres e honram os Budas.",
      20: "A compreensão profunda da natureza ilusória da realidade.",
      21: "O amor compassivo que emana de todos os Budas.",
      22: "A firmeza inabalável na busca pela sabedoria suprema.",
      23: "A iluminação que surge da prática de todos os caminhos espirituais.",
      24: "A fragrância espiritual que emana da pureza interior.",
      25: "A lembrança constante da grande compaixão em todas as ações.",
      26: "A vitória suprema sobre todas as limitações.",
      27: "A humildade que remove todo orgulho e arrogância.",
      28: "A liberação completa de todos os desejos mundanos.",
      29: "A manifestação contínua da linhagem búdica.",
      30: "A compaixão infinita que ouve os clamores de todos os seres.",
      31: "O acesso direto à presença búdica através da devoção.",
      32: "A proteção divina que cobre todos os seres como nuvens benéficas.",
      33: "A estabilidade inabalável na sabedoria suprema.",
      34: "A luz do Dharma que guia todos os seres para fora da escuridão.",
      35: "A paz profunda que surge da meditação śamatha.",
      36: "A alegria pura que ilumina todos os mundos.",
      37: "As manifestações compassivas que guiam todos os seres.",
      38: "O deleite espiritual que surge a cada momento de consciência.",
      39: "A proteção espiritual através de sons sagrados e manifestações.",
      40: "A alegria radiante que faz florir todas as árvores da sabedoria.",
      41: "A energia espiritual que protege e amadurece todos os seres.",
      42: "As manifestações miraculosas que marcam o nascimento de bodhisattvas.",
      43: "A proteção que alcança todos os caminhos de meditação.",
      44: "As manifestações mágicas que surgem da sabedoria da oração.",
      45: "A memória cristalina que preserva todos os ensinamentos.",
      46: "A amizade universal que abraça todos os seres.",
      47: "O conhecimento supremo de todas as artes espirituais.",
      48: "A excelência suprema livre de todos os obstáculos.",
      49: "A essência da liberação através da memória pura.",
      50: "A luz pura da sabedoria que nunca se mancheia.",
      51: "O exército invencível da sabedoria e compaixão.",
      52: "A palavra sagrada que realiza todos os desejos benéficos.",
      53: "A glória que surge da compreensão da natureza ilusória.",
      54: "O amor bondoso que conhece todos os objetos nos três tempos.",
      55: "A sabedoria suprema que corta através de todas as ilusões.",
      56: "A bondade universal que abrange todos os seres e práticas."
    };
    return teachings[character.id as keyof typeof teachings] || character.liberacao || "Ensinamento Transcendental";
  };

  const teaching = getContent(currentCharacter.id, 'teaching', getDefaultTeaching(currentCharacter));

  // Reset editing state when character changes
  useEffect(() => {
    setIsEditing(false);
    setEditText("");
  }, [currentCharacter.id]);

  const startEditing = () => {
    setEditText(teaching);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    updateContent(currentCharacter.id, 'teaching', editText);
    
    // Log for persistence simulation
    console.log(`Salvando ensinamento para personagem ${currentCharacter.id} (${currentCharacter.name}): ${editText}`);
    
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(teaching);
    setIsEditing(false);
  };

  return (
    <Card className="bg-black/30 border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-cyan-500/10">
      <div className="p-4 relative">
        {/* Cyberpunk Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 mini-grid"></div>
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 flex items-center justify-center backdrop-blur-sm">
            <Compass className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-cyan-300 text-sm font-mono tracking-wide">ENSINAMENTO</h3>
            <p className="text-xs text-cyan-400/70 font-mono">CAP. {String(currentCharacter.id).padStart(2, '0')} - {currentCharacter.name}</p>
          </div>
          {!isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={startEditing}
              className="bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 backdrop-blur-sm cyber-button"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <h4 className="text-sm font-medium text-purple-300 mb-3 font-mono">
          {currentCharacter.liberacao && currentCharacter.liberacao !== "-" && currentCharacter.liberacao !== "!" 
            ? currentCharacter.liberacao 
            : "Sabedoria Transcendental"
          }
        </h4>
        
        <div className="mb-4 relative z-10">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-black/50 border border-cyan-400/50 rounded-lg px-3 py-2 text-cyan-100 text-xs leading-relaxed resize-none backdrop-blur-sm font-mono"
                rows={4}
                autoFocus
                placeholder="Digite o ensinamento..."
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-green-500/30 border border-green-400/50 text-green-300 hover:bg-green-500/40 backdrop-blur-sm font-mono cyber-button"
                >
                  <Save className="w-3 h-3 mr-1" />
                  SALVAR
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  className="bg-red-500/30 border border-red-400/50 text-red-300 hover:bg-red-500/40 backdrop-blur-sm font-mono cyber-button"
                >
                  <X className="w-3 h-3 mr-1" />
                  CANCELAR
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-cyan-100/80 leading-relaxed font-mono">{teaching}</p>
          )}
        </div>
        
        <Button
          size="sm"
          className="w-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 text-cyan-300 hover:from-cyan-500/40 hover:to-purple-500/40 backdrop-blur-sm font-mono tracking-wide cyber-button"
        >
          CONTINUAR JORNADA →
        </Button>

        {/* Holographic Border */}
        <div className="absolute inset-0 rounded-lg border border-cyan-500/20 pointer-events-none">
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg blur-sm"></div>
        </div>
      </div>
    </Card>
  );
};

export default TeachingPanel;
