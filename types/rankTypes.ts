export interface Ranker {
  rank: number;
  nickname: string;
  lp: number;
}

export interface TopRanker extends Ranker {
  imgUrl: string;
}
