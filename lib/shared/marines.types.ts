export enum Weapon {
  CHAIN_SWORD = 'CHAIN_SWORD',
  POWER_AXE = 'POWER_AXE',
  POWER_SWORD = 'POWER_SWORD',
  ASSAULT_BOLTER = 'ASSAULT_BOLTER',
  HEAVY_BOLT_RIFLE = 'HEAVY_BOLT_RIFLE',
  PLASMA_GUN = 'PLASMA_GUN',
  AUTOCANNON = 'AUTOCANNON',
  SNIPER_RIFLE = 'SNIPER_RIFLE',
  SHOTGUN = 'SHOTGUN',
}

export enum Rank {
  ASPIRANT = 'ASPIRANT',
  NEOPHYTE = 'NEOPHYTE',
  VANGUARD = 'VANGUARD',
  BATTLE_BROTHER = 'BATTLE_BROTHER',
  SERGEANT = 'SERGEANT',
  LIEUTENANT = 'LIEUTENANT',
  CAPTAIN = 'CAPTAIN',
  CHAPTER_MASTER = 'CHAPTER_MASTER',
}

export type MarineStats = {
  hp: number;
  atk: number;
  def: number;
};

export type Marine = {
  id: string;
  name: string;
  rank: Rank;
  chapter: string;
  wargear: Weapon[];
  stats: MarineStats;
  squadId?: string;
  createdAt: string;
  updatedAt: string;
};

export type FindMarinesFilters = {
  rank?: Rank;
  squadId?: string;
  chapter?: string;
};

export type CreateMarineInput = {
  name: string;
  rank: Rank;
  chapter: string;
  stats: MarineStats;
  squadId?: string;
  wargear?: Weapon[];
};

export type UpdateMarineInput = Partial<CreateMarineInput>;
