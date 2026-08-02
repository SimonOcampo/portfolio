export interface Trainer {
  name: string;
  animatedSprite: string;
  stillSprite: string;
}

export type BattleEffectsMode = "cinematic" | "reduced";
export type BattleMoveEffect = "hydro-pump" | "leaf-blade" | "grass-knot";

export interface Pokemon {
  id: number;
  name: string;
  move: string;
  type: "water" | "grass" | "fire";
  moveType: "water" | "grass";
  moveEffect: BattleMoveEffect;
  frontSprite: string;
  backSprite: string;
  frontStill: string;
  backStill: string;
}

export const TRAINERS: readonly Trainer[] = [
  {
    name: "Nate",
    animatedSprite: "/trainers/nate-animated.png",
    stillSprite: "/trainers/nate-still.png",
  },
  {
    name: "Rosa",
    animatedSprite: "/trainers/rosa-animated.png",
    stillSprite: "/trainers/rosa-still.png",
  },
] as const;

export const POKEMON: readonly Pokemon[] = [
  {
    id: 9,
    name: "Blastoise",
    move: "Hydro Pump",
    type: "water",
    moveType: "water",
    moveEffect: "hydro-pump",
    frontSprite: "/pokemon/blastoise-front.gif",
    backSprite: "/pokemon/blastoise-back.gif",
    frontStill: "/pokemon/blastoise-front-still.png",
    backStill: "/pokemon/blastoise-back-still.png",
  },
  {
    id: 254,
    name: "Sceptile",
    move: "Leaf Blade",
    type: "grass",
    moveType: "grass",
    moveEffect: "leaf-blade",
    frontSprite: "/pokemon/sceptile-front.gif",
    backSprite: "/pokemon/sceptile-back.gif",
    frontStill: "/pokemon/sceptile-front-still.png",
    backStill: "/pokemon/sceptile-back-still.png",
  },
  {
    id: 500,
    name: "Emboar",
    move: "Grass Knot",
    type: "fire",
    moveType: "grass",
    moveEffect: "grass-knot",
    frontSprite: "/pokemon/emboar-front.gif",
    backSprite: "/pokemon/emboar-back.gif",
    frontStill: "/pokemon/emboar-front-still.png",
    backStill: "/pokemon/emboar-back-still.png",
  },
] as const;

export const BATTLE_VICTORY_STORAGE_KEY = "neural-water-gym-victory-v2";

export interface StoredBattleVictory {
  version: 2;
  trainerName: string;
  pokemonId: number;
}

export function restoreBattleVictory(value: string | null) {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<StoredBattleVictory>;
    if (parsed.version !== 2) return null;

    const trainer = TRAINERS.find((item) => item.name === parsed.trainerName);
    const pokemon = POKEMON.find((item) => item.id === parsed.pokemonId);
    return trainer && pokemon ? { trainer, pokemon } : null;
  } catch {
    return null;
  }
}
