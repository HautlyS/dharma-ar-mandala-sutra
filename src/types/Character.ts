
export interface Character {
  id: number;
  name: string;
  liberacao: string;
  driveLink: string;
  modelUrl: string;
  teaching?: string;
  location?: string;
  isVisited?: boolean;
}

export interface EditableContent {
  teaching: string;
  location: string;
  mapUrl?: string;
}
