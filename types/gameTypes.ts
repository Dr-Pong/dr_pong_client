export type RoomType = 'ladder' | 'normal';

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Ball {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface posData {
  ballPos: { x: number; y: number };
  playerXPos: { me: number; opponent: number };
  gameTime: number;
}

export interface roundData {
  round: number;
  me: number;
  opponent: number;
  server: boolean;
}

interface userInitialData {
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
}

export interface gameInit {
  me: userInitialData;
  opponent: userInitialData;
  ball: { x: number; y: number; size: number };
  server: boolean;
  round: number;
  gameTime: number;
}

export interface countdownData {
  time: number;
}

export interface gameResult {
  result: 'win' | 'lose' | 'tie';
}

export interface ExpResult {
  beforeExp: number;
  expChange: number;
  levelExp: number;
}

export interface isInGame {
  roomType: 'normal' | 'ladder';
  roomId: string;
}
