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
}

export interface roundData {
  round: number;
  me: number;
  opponent: number;
  server: boolean;
}

export interface initData {
  me: { x: number; y: number; width: number; height: number };
  opponent: { x: number; y: number; width: number; height: number };
  ball: { x: number; y: number; size: number };
  server: boolean;
  round: number;
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
