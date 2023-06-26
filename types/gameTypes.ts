export type RoomType = 'ladder' | 'normal';

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  move: number;
  speed: number;
}

export interface Ball {
  x: number;
  y: number;
  width: number;
  height: number;
  moveX: number;
  moveY: number;
  speed: number;
}
