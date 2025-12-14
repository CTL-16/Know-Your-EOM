export type EyeSide = 'right' | 'left';

export enum MuscleId {
  MR = 'MR',
  LR = 'LR',
  SR = 'SR',
  IR = 'IR',
  SO = 'SO',
  IO = 'IO',
}

export interface MuscleData {
  id: MuscleId;
  name: string;
  fullName: string;
  actionDescription: string;
}

export interface Card {
  uniqueId: string;
  muscleId: MuscleId;
  type: 'text' | 'visual';
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  isPlaying: boolean;
  gameWon: boolean;
  currentEye: EyeSide;
  moves: number;
  timer: number;
}