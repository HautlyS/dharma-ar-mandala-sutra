import { Character, characters } from './characters';

export interface CharacterStats {
  totalCharacters: number;
  byCategory: Record<string, number>;
  byDifficulty: Record<string, number>;
  withModels: number;
  withoutModels: number;
  modelLoadRate: number;
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  hasModel?: boolean;
  keywords?: string[];
  practiceType?: string[];
}

export interface SearchResult {
  character: Character;
  relevanceScore: number;
  matchedFields: string[];
}

// Get character statistics
export const getCharacterStats = (): CharacterStats => {
  const byCategory: Record<string, number> = {};
  const byDifficulty: Record<string, number> = {};
  let withModels = 0;

  characters.forEach(char => {
    // Count by category
    const category = char.category || 'other';
    byCategory[category] = (byCategory[category] || 0) + 1;

    // Count by difficulty
    const difficulty = char.difficulty || 'intermediate';
    byDifficulty[difficulty] = (byDifficulty[difficulty] || 0) + 1;

    // Count models
    if (char.glbStatus) withModels++;
  });

  return {
    totalCharacters: characters.length,
    byCategory,
    byDifficulty,
    withModels,
    withoutModels: characters.length - withModels,
    modelLoadRate: (withModels / characters.length) * 100
  };
};

// Search and filter characters
export const searchCharacters = (
  query: string = '',
  filters: SearchFilters = {}
): SearchResult[] => {
  const results: SearchResult[] = [];
  const queryLower = query.toLowerCase();

  characters.forEach(character => {
    let relevanceScore = 0;
    const matchedFields: string[] = [];

    // Apply filters first
    if (filters.category && character.category !== filters.category) return;
    if (filters.difficulty && character.difficulty !== filters.difficulty) return;
    if (filters.hasModel !== undefined && character.glbStatus !== filters.hasModel) return;

    // Keyword filter
    if (filters.keywords && filters.keywords.length > 0) {
      const charKeywords = character.keywords || [];
      const hasMatchingKeyword = filters.keywords.some(keyword => 
        charKeywords.some(charKeyword => 
          charKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      if (!hasMatchingKeyword) return;
    }

    // Practice type filter
    if (filters.practiceType && filters.practiceType.length > 0) {
      const charPractices = character.practiceType || [];
      const hasMatchingPractice = filters.practiceType.some(practice => 
        charPractices.some(charPractice => 
          charPractice.toLowerCase().includes(practice.toLowerCase())
        )
      );
      if (!hasMatchingPractice) return;
    }

    // Text search scoring
    if (queryLower) {
      // Name match (highest priority)
      if (character.name.toLowerCase().includes(queryLower)) {
        relevanceScore += 100;
        matchedFields.push('name');
      }

      // Significance match
      if (character.significance.toLowerCase().includes(queryLower)) {
        relevanceScore += 80;
        matchedFields.push('significance');
      }

      // Occupation match
      if (character.occupation.toLowerCase().includes(queryLower)) {
        relevanceScore += 60;
        matchedFields.push('occupation');
      }

      // Teaching match
      if (character.teaching?.toLowerCase().includes(queryLower)) {
        relevanceScore += 50;
        matchedFields.push('teaching');
      }

      // Description match
      if (character.description.toLowerCase().includes(queryLower)) {
        relevanceScore += 40;
        matchedFields.push('description');
      }

      // Summary match
      if (character.summary.toLowerCase().includes(queryLower)) {
        relevanceScore += 30;
        matchedFields.push('summary');
      }

      // Keywords match
      const keywordMatches = (character.keywords || []).filter(keyword =>
        keyword.toLowerCase().includes(queryLower)
      );
      if (keywordMatches.length > 0) {
        relevanceScore += keywordMatches.length * 20;
        matchedFields.push('keywords');
      }

      // Location match
      if (character.locationDescription?.toLowerCase().includes(queryLower)) {
        relevanceScore += 15;
        matchedFields.push('location');
      }

      // Only include if there's a match or no query
      if (relevanceScore === 0 && queryLower) return;
    } else {
      // No query, include all that pass filters
      relevanceScore = 1;
    }

    results.push({
      character,
      relevanceScore,
      matchedFields
    });
  });

  // Sort by relevance score (descending) then by ID
  return results.sort((a, b) => {
    if (a.relevanceScore !== b.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return a.character.id - b.character.id;
  });
};

// Get characters by category
export const getCharactersByCategory = (category: string): Character[] => {
  return characters.filter(char => char.category === category);
};

// Get characters by difficulty
export const getCharactersByDifficulty = (difficulty: string): Character[] => {
  return characters.filter(char => char.difficulty === difficulty);
};

// Get characters with 3D models
export const getCharactersWithModels = (): Character[] => {
  return characters.filter(char => char.glbStatus);
};

// Get related characters
export const getRelatedCharacters = (characterId: number): Character[] => {
  const character = characters.find(c => c.id === characterId);
  if (!character || !character.relatedCharacters) return [];
  
  return character.relatedCharacters
    .map(id => characters.find(c => c.id === id))
    .filter((c): c is Character => c !== undefined);
};

// Get random character
export const getRandomCharacter = (excludeId?: number): Character => {
  const availableCharacters = excludeId 
    ? characters.filter(c => c.id !== excludeId)
    : characters;
  
  const randomIndex = Math.floor(Math.random() * availableCharacters.length);
  return availableCharacters[randomIndex];
};

// Get character by ID with fallback
export const getCharacterById = (id: number): Character => {
  return characters.find(c => c.id === id) || characters[0];
};

// Get next/previous character with wrapping
export const getAdjacentCharacter = (currentId: number, direction: 'next' | 'prev'): Character => {
  const currentIndex = characters.findIndex(c => c.id === currentId);
  if (currentIndex === -1) return characters[0];

  let nextIndex;
  if (direction === 'next') {
    nextIndex = (currentIndex + 1) % characters.length;
  } else {
    nextIndex = currentIndex === 0 ? characters.length - 1 : currentIndex - 1;
  }

  return characters[nextIndex];
};

// Get practice recommendations based on character
export const getPracticeRecommendations = (character: Character): string[] => {
  const recommendations: string[] = [];
  
  if (character.practiceType) {
    recommendations.push(...character.practiceType.map(p => `Praticar ${p}`));
  }
  
  if (character.mantra) {
    recommendations.push(`Recitar o mantra: ${character.mantra}`);
  }
  
  if (character.offerings) {
    recommendations.push(`Fazer oferendas: ${character.offerings.join(', ')}`);
  }
  
  if (character.mudra) {
    recommendations.push(`Praticar o mudra: ${character.mudra}`);
  }
  
  return recommendations;
};

// Export all available categories, difficulties, etc. for UI
export const getAvailableFilters = () => {
  const categories = new Set<string>();
  const difficulties = new Set<string>();
  const practiceTypes = new Set<string>();
  const keywords = new Set<string>();

  characters.forEach(char => {
    if (char.category) categories.add(char.category);
    if (char.difficulty) difficulties.add(char.difficulty);
    if (char.practiceType) char.practiceType.forEach(p => practiceTypes.add(p));
    if (char.keywords) char.keywords.forEach(k => keywords.add(k));
  });

  return {
    categories: Array.from(categories).sort(),
    difficulties: Array.from(difficulties).sort(),
    practiceTypes: Array.from(practiceTypes).sort(),
    keywords: Array.from(keywords).sort()
  };
};
