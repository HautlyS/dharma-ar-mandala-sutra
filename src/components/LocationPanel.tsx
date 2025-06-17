
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Edit3, Save, X, ExternalLink } from "lucide-react";
import { useCharacterNavigation } from "@/hooks/useCharacterNavigation";
import { useEditableContent } from "@/hooks/useEditableContent";

const LocationPanel = () => {
  const { currentCharacter } = useCharacterNavigation();
  const { updateContent, getContent } = useEditableContent(currentCharacter.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("");

  // Get location specific to current character
  const getDefaultLocation = (character: any) => {
    const locations = {
      1: "Monte Vulture - Rajgir",
      2: "Jardim Jetavana",
      3: "Monte Wutai",
      4: "Palácio das Nuvens",
      5: "Oceano de Sabedoria",
      6: "Pico da Iluminação",
      7: "Palácio das Nuvens Dharma",
      8: "Jardim da Libertação",
      9: "Templo do Oceano Profundo",
      10: "Vale da Bem-Aventurança",
      11: "Fortaleza da Determinação",
      12: "Palácio da Vitória Eterna",
      13: "Biblioteca da Memória Divina",
      14: "Torre da Luz Perpétua",
      15: "Palácio dos Sentidos Purificados",
      16: "Tesouro dos Méritos Infinitos",
      17: "Câmara do Tesouro Mental",
      18: "Jardim das Orações Sagradas",
      19: "Jardim dos Perfumes Celestiais",
      20: "Espelho da Verdade",
      21: "Palácio da Grande Luz",
      22: "Montanha Imóvel",
      23: "Portão de Todos os Caminhos",
      24: "Lago dos Lótus Perfumados",
      25: "Estandarte da Compaixão",
      26: "Pico da Vitória Suprema",
      27: "Caverna da Humildade",
      28: "Palácio da Liberdade",
      29: "Salão da Família Búdica",
      30: "Monte Potala",
      31: "Portal dos Pés de Lótus",
      32: "Palácio do Grande Deva",
      33: "Rocha da Estabilidade",
      34: "Portão da Radiância",
      35: "Lago da Tranquilidade",
      36: "Palácio da Alegria Radiante",
      37: "Centro de Todos os Mundos",
      38: "Oceano da Serenidade",
      39: "Cidade Protegida",
      40: "Floresta da Alegria",
      41: "Jardim do Amadurecimento",
      42: "Mandala da Luz Suprema",
      43: "Oceano dos Samādhis",
      44: "Palácio da Ilusão Sagrada",
      45: "Palácio da Luz Suprema",
      46: "Ponte da Amizade Universal",
      47: "Atelier das Artes Sagradas",
      48: "Pico da Excelência",
      49: "Santuário da Memória Pura",
      50: "Templo da Luz Imaculada",
      51: "Fortaleza Invencível",
      52: "Pico da Verdade Auspiciosa",
      53: "Palácio da Glória Dupla",
      54: "Palácio Tuṣita",
      55: "Torre da Sabedoria Final",
      56: "Salão da Bondade Universal"
    };
    return locations[character.id as keyof typeof locations] || `Local Sagrado do Mestre ${character.name}`;
  };

  const location = getContent(currentCharacter.id, 'location', getDefaultLocation(currentCharacter));
  const mapUrl = getContent(currentCharacter.id, 'mapUrl', `https://maps.google.com/maps?q=${encodeURIComponent(location)}`);

  // Reset editing state when character changes
  useEffect(() => {
    setIsEditing(false);
    setEditText("");
  }, [currentCharacter.id]);

  const startEditing = () => {
    setEditText(location);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    updateContent(currentCharacter.id, 'location', editText);
    
    // Log for persistence simulation
    console.log(`Salvando local para personagem ${currentCharacter.id} (${currentCharacter.name}): ${editText}`);
    
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(location);
    setIsEditing(false);
  };

  const openGoogleMaps = () => {
    window.open(mapUrl, '_blank');
  };

  return (
    <Card className="bg-black/30 border-purple-500/40 backdrop-blur-xl shadow-xl shadow-purple-500/10">
      <div className="p-4 relative">
        {/* Cyberpunk Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(147,51,234,0.3) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(147,51,234,0.3) 1px, transparent 1px)`,
            backgroundSize: '10px 10px'
          }}></div>
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 flex items-center justify-center backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-purple-300 text-sm font-mono tracking-wide">LOCAL SAGRADO</h3>
            <p className="text-xs text-purple-400/70 font-mono">CAP. {String(currentCharacter.id).padStart(2, '0')} - COORDENADAS</p>
          </div>
          {!isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={startEditing}
              className="bg-purple-500/20 border border-purple-400/50 text-purple-300 hover:bg-purple-500/30 backdrop-blur-sm cyber-button"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <div className="mb-4 relative z-10">
          {isEditing ? (
            <div className="space-y-3">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full bg-black/50 border border-purple-400/50 rounded-lg px-3 py-2 text-purple-100 text-xs backdrop-blur-sm font-mono"
                autoFocus
                placeholder="Digite o local sagrado..."
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
            <p className="text-xs text-purple-100/80 mb-3 font-mono">{location}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={openGoogleMaps}
            className="flex-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-purple-300 hover:from-purple-500/40 hover:to-pink-500/40 backdrop-blur-sm font-mono tracking-wide cyber-button"
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            GOOGLE MAPS
          </Button>
        </div>

        {/* Holographic Border */}
        <div className="absolute inset-0 rounded-lg border border-purple-500/20 pointer-events-none">
          <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-lg blur-sm"></div>
        </div>
      </div>
    </Card>
  );
};

export default LocationPanel;
