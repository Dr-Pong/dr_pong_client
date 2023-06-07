export interface User {
  nickname: string;
  imgUrl: string;
  tfaRequired: boolean;
  roleType: 'guest' | 'noname' | 'member' | 'admin';
}

export interface UserDetail {
  nickname: string;
  image: Image;
  level: number;
  title: {
    id: number;
    title: string;
  } | null;
  statusMessage: string;
}

export interface UserStat {
  winRate: number;
  wins: number;
  ties: number;
  loses: number;
}

export interface UserRank {
  record: number | null;
  rank: number | null;
  tier: 'doctor' | 'master' | 'bachelor' | 'student' | 'egg';
}

export interface DetailDto {
  image: Image;
  title: Title;
  statusMessage: string;
}

export interface Title {
  id: number;
  title: string;
}
export interface Titles {
  titles: Title[];
}

export interface UserImages {
  images: Image[];
}
export interface Image {
  id: number;
  url: string;
}

export type Selectable = {
  id: number;
  name: string;
  imgUrl: string;
  status: string;
};
export interface Achievement extends Selectable {
  content: string;
}

export interface Achievements {
  achievements: (Achievement | null)[];
}
export interface Emoji extends Selectable {}

export interface Emojis {
  emojis: (Emoji | null)[];
}

export type Selectables = Achievements | Emojis;

export interface PatchAchievements {
  ids: number[];
}

export interface PatchEmojis {
  ids: number[];
}

export type PatchSelectables = PatchAchievements | PatchEmojis;

export interface SelectablesClass {
  getSelectables(): (Selectable | null)[];
  getSelected(): { ids: (number | null)[] };
  isEmpty(): boolean;
  copyJSON(other: Selectables): SelectablesClass;
  copyArray(other: (Selectable | null)[]): SelectablesClass;
  selectItem(item: Selectable): SelectablesClass;
  deselectItem(item: Selectable): SelectablesClass;
  replaceWithNull(item: Selectable): SelectablesClass;
  clone(): SelectablesClass;
}

export class AchievementsClass implements SelectablesClass {
  private achievements: (Achievement | null)[];
  constructor(selectables: (Selectable | null)[]) {
    this.achievements = selectables as (Achievement | null)[];
  }

  static getQuery() {
    return 'achievements';
  }
  getSelectables(): (Achievement | null)[] {
    return this.achievements;
  }
  getSelected() {
    return {
      ids: this.achievements.map((item) => item?.id ?? null),
    };
  }
  isEmpty() {
    return this.achievements.length === 0;
  }
  copyJSON(other: Selectables): AchievementsClass {
    const achievements = other as Achievements;
    this.achievements = achievements.achievements;
    return this;
  }
  copyArray(other: (Selectable | null)[]): AchievementsClass {
    this.achievements = other as (Achievement | null)[];
    return this;
  }
  selectItem(item: Selectable): AchievementsClass {
    if (
      this.achievements.includes(null) &&
      !this.achievements.some((achievement) => achievement?.id === item.id)
    ) {
      item.status = 'selected';
      this.achievements[this.achievements.indexOf(null)] = item as Achievement;
    }
    return this;
  }
  deselectItem(item: Selectable): AchievementsClass {
    const index = this.achievements.findIndex(
      (achievement) => achievement?.id === item.id
    );
    if (index !== -1) {
      item.status = 'achieved';
      this.achievements[index] = item as Achievement;
    }
    return this;
  }
  replaceWithNull(item: Selectable): AchievementsClass {
    const index = this.achievements.findIndex(
      (achievement) => achievement?.id === item.id
    );
    if (index !== -1) {
      this.achievements[index] = null;
    }
    return this;
  }
  clone(): AchievementsClass {
    const clone = new AchievementsClass([]);
    clone.copyArray(this.achievements);
    return clone;
  }
}

export class EmojisClass implements SelectablesClass {
  private emojis: (Emoji | null)[];
  constructor(emojis: (Selectable | null)[]) {
    this.emojis = emojis as (Emoji | null)[];
    this.emojis = this.emojis.filter((i) => i?.status !== 'unachieved');
  }

  static getQuery() {
    return 'emojis';
  }
  getSelectables(): (Emoji | null)[] {
    return this.emojis;
  }
  getSelected() {
    return {
      ids: this.emojis.map((item) => item?.id ?? null),
    };
  }
  isEmpty() {
    return this.emojis.length === 0;
  }
  copyJSON(other: Selectables): EmojisClass {
    const emojis = other as Emojis;
    this.emojis = emojis.emojis.filter((i) => i?.status !== 'unachieved');
    return this;
  }
  copyArray(other: (Selectable | null)[]): EmojisClass {
    this.emojis = other as (Emoji | null)[];
    return this;
  }
  selectItem(item: Selectable): EmojisClass {
    if (
      this.emojis.includes(null) &&
      !this.emojis.some((emoji) => emoji?.id === item.id)
    ) {
      item.status = 'selected';
      this.emojis[this.emojis.indexOf(null)] = item as Emoji;
    }
    return this;
  }
  deselectItem(item: Selectable): EmojisClass {
    const index = this.emojis.findIndex((emoji) => emoji?.id === item.id);
    if (index !== -1) {
      item.status = 'achieved';
      this.emojis[index] = item as Emoji;
    }
    return this;
  }
  replaceWithNull(item: Selectable): EmojisClass {
    const index = this.emojis.findIndex((emoji) => emoji?.id === item.id);
    if (index !== -1) {
      this.emojis[index] = null;
    }
    return this;
  }
  clone(): EmojisClass {
    const clone = new EmojisClass([]);
    clone.copyArray(this.emojis);
    return clone;
  }
}
