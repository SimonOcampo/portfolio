export type ChamberId = "home" | "projects" | "experience" | "skills";

export interface ChamberDefinition {
  id: ChamberId;
  label: string;
  themedLabel: string;
  shortLabel: string;
}

export const CHAMBERS: readonly ChamberDefinition[] = [
  { id: "home", label: "Home", themedLabel: "Gym Entrance", shortLabel: "Home" },
  { id: "projects", label: "Projects", themedLabel: "Trainer Gauntlet", shortLabel: "Work" },
  { id: "experience", label: "Experience", themedLabel: "Battle History", shortLabel: "Journey" },
  { id: "skills", label: "Skills", themedLabel: "Leader's Sanctum", shortLabel: "Skills" },
] as const;

export function getChamberIndex(hash: string): number {
  const id = hash.replace(/^#/, "") as ChamberId;
  const index = CHAMBERS.findIndex((chamber) => chamber.id === id);
  return index >= 0 ? index : 0;
}
