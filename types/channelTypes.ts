export interface Channel {
  id: number;
  title: string;
  access?: 'public' | 'protected';
  headCount: number;
  maxCount: number;
}

export interface ChannelList {
  channels: Channel[];
  currentPage: number;
  totalPage: number;
}

export interface ChannelInfo {
  access: string;
  title: string;
  password: string | null;
  maxCount: number;
}
