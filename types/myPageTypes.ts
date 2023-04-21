export interface User {
  nickname: string;
  imgUrl: string;
}

export interface UserDetail {
  nickname: string;
  imgUrl: string;
  level: number;
  title: string | null;
  statusMessage: string;
}

export interface UserStat {
  totalStat: {
    winRate: number;
    win: number;
    ties: number;
    lose: number;
  };
  seasonStat: {
    winRate: number;
    win: number;
    ties: number;
    lose: number;
    record: number;
    rank: number;
  };
  bestStat: {
    record: number;
    rank: number;
  };
}

export interface Achievement {
  id: number;
  name: string;
  imgUrl: string;
  content: string;
  status: string;
}

export interface Emoji {
  id: number;
  name: string;
  imgUrl: string;
  status: string;
}

export interface Title {
  id: number;
  title: string;
}

export interface PatchDetail {
  imgUrl: string | null;
  title: number;
  message: string;
}
