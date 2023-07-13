export interface Record {
  gameId: number;
  gameType: 'ladder' | 'normal';
  playedAt: string;
  me: PlayerResult;
  you: PlayerResult;
  result: 'win' | 'lose' | 'tie';
}

export interface Records {
  records: Record[];
  isLastPage: boolean;
}

export interface RecordDetail {
  duration: number;
  me: LpResult;
  you: LpResult;
  rounds: Round[];
}

export interface PlayerResult {
  nickname: string;
  imgUrl: string;
  score: number;
}

export interface LpResult {
  lp: number;
  lpChange: number;
}

export interface Round {
  bounces: number;
  meWin: boolean;
}
