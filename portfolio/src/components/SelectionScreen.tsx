"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Trainer {
  name: string;
  sprite: string;
}

export interface Pokemon {
  id: number;
  name: string;
  move: string;
  type: "water" | "grass" | "fire";
}

const TRAINERS: Trainer[] = [
  { name: "Alex", sprite: "/trainers/male-trainer.png" },
  { name: "Vera", sprite: "/trainers/female-trainer.png" },
];

const POKEMON: Pokemon[] = [
  { id: 9, name: "Blastoise", move: "Hydro Pump", type: "water" },
  { id: 254, name: "Sceptile", move: "Leaf Blade", type: "grass" },
  { id: 500, name: "Emboar", move: "Flamethrower", type: "fire" },
];

const MOVE_COLORS = {
  water: "font-bold text-cyan-400",
  grass: "font-bold text-green-400",
  fire: "font-bold text-orange-500",
};

interface SelectionScreenProps {
  onCancel: () => void;
  onStart: (trainer: Trainer, pokemon: Pokemon) => void;
}

export default function SelectionScreen({
  onCancel,
  onStart,
}: SelectionScreenProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/90 p-4 pt-16 backdrop-blur-sm md:pt-24"
    >
      <div className="mb-8 w-full max-w-4xl rounded-2xl border-2 border-primary/50 bg-neutral-900/80 p-8 shadow-[0_0_40px_rgba(0,210,255,0.2)]">
        <div className="mb-12">
          <h2 className="mb-6 text-center font-mono text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
            Step 1: Choose Your Trainer
          </h2>
          <div className="mx-auto grid max-w-lg grid-cols-2 gap-6">
            {TRAINERS.map((trainer) => (
              <button
                key={trainer.name}
                onClick={() => setSelectedTrainer(trainer)}
                className={`flex flex-col items-center gap-4 rounded-xl border-2 bg-neutral-800 p-6 transition-all duration-300 ${
                  selectedTrainer?.name === trainer.name
                    ? "scale-105 border-primary shadow-[0_0_20px_rgba(0,210,255,0.5)]"
                    : "border-white/10 hover:border-white/30 hover:bg-neutral-700"
                }`}
              >
                <div className="relative h-32 w-32">
                  <Image
                    src={trainer.sprite}
                    alt={trainer.name}
                    fill
                    quality={100}
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <span className="text-lg font-bold text-white">
                  {trainer.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2
            className={`mb-6 text-center font-mono text-2xl font-bold uppercase tracking-widest transition-opacity duration-300 ${
              selectedTrainer
                ? "text-white opacity-100 drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]"
                : "text-zinc-600 opacity-50"
            }`}
          >
            Step 2: Choose Your Partner
          </h2>
          <div
            className={`flex flex-wrap justify-center gap-6 transition-all duration-500 ${
              !selectedTrainer
                ? "pointer-events-none opacity-40 grayscale blur-sm"
                : "pointer-events-auto opacity-100 grayscale-0 blur-none"
            }`}
          >
            {POKEMON.map((pokemon) => (
              <button
                key={pokemon.name}
                disabled={!selectedTrainer}
                onClick={() => setSelectedPokemon(pokemon)}
                className={`group flex w-48 flex-col items-center gap-3 rounded-xl border-2 bg-neutral-800 p-6 transition-all duration-300 ${
                  selectedPokemon?.name === pokemon.name
                    ? "scale-105 border-primary shadow-[0_0_20px_rgba(0,210,255,0.5)]"
                    : "border-white/10 hover:border-white/30 hover:bg-neutral-700"
                }`}
              >
                <img
                  src={`https://play.pokemonshowdown.com/sprites/gen5ani/${pokemon.name.toLowerCase()}.gif`}
                  alt={pokemon.name}
                  className="h-20 object-contain"
                  style={{ imageRendering: "pixelated" }}
                />
                <div className="text-center">
                  <div className="font-bold text-white">{pokemon.name}</div>
                  <div className="mt-1 text-xs text-text-muted">Moveset:</div>
                  <div className={`mt-0.5 text-sm ${MOVE_COLORS[pokemon.type]}`}>
                    {pokemon.move}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-white/70 transition-colors hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              selectedTrainer &&
              selectedPokemon &&
              onStart(selectedTrainer, selectedPokemon)
            }
            disabled={!selectedTrainer || !selectedPokemon}
            className={`rounded-lg px-8 py-3 font-bold uppercase tracking-widest transition-all duration-300 ${
              selectedTrainer && selectedPokemon
                ? "border border-red-500 bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-105 hover:bg-red-500"
                : "cursor-not-allowed border border-neutral-700 bg-neutral-800 text-neutral-500"
            }`}
          >
            BEGIN BATTLE &gt;
          </button>
        </div>
      </div>
    </motion.div>
  );
}
