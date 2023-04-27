export interface User {
  nickname: string;
  imgUrl: string;
}

export interface UserDetail {
  nickname: string;
  imgUrl: string;
  level: number;
  title: {
    id: number;
    title: string;
  } | null;
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
export interface Titles {
  titles: Title[];
}

export interface PatchDetail {
  imgUrl: string | null;
  title: number | null;
  message: string;
}

export interface PatchAchievements {
  achievements: number[];
}

export interface PatchEmojis {
  emojis: number[];
}

export type PatchSelectables = PatchAchievements | PatchEmojis;
export interface Achievements {
  achievements: (Achievement | null)[];
}
export interface Emojis {
  emojis: (Emoji | null)[];
}