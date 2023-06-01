export interface EachChannel {
  id: number;
  title: string;
  access?: 'public' | 'protected';
  headCount: number;
  maxCount: number;
}

export type IsMyChannel = EachChannel | null;

export interface AllChannels {
  channel: EachChannel[];
  currentPage: number;
  totalPage: number;
}

export interface NewChannel {
  type: string;
  title: string;
  password: null | string;
  capacity: number;
}
