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
  water: "text-cyan-400 font-bold",
  grass: "text-green-400 font-bold",
  fire: "text-orange-500 font-bold",
};

interface SelectionScreenProps {
  onCancel: () => void;
  onStart: (trainer: Trainer, pokemon: Pokemon) => void;
}

export default function SelectionScreen({ onCancel, onStart }: SelectionScreenProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-4xl rounded-2xl border-2 border-primary/50 bg-neutral-900/80 p-8 shadow-[0_0_40px_rgba(0,210,255,0.2)]">
        
        {/* Step 1: Choose Trainer */}
        <div className="mb-12">
          <h2 className="mb-6 text-center font-mono text-2xl font-bold text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
            Step 1: Choose Your Trainer
          </h2>
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            {TRAINERS.map((trainer) => (
              <button
                key={trainer.name}
                onClick={() => setSelectedTrainer(trainer)}
                className={`flex flex-col items-center gap-4 rounded-xl border-2 bg-neutral-800 p-6 transition-all duration-300 ${
                  selectedTrainer?.name === trainer.name
                    ? "border-primary scale-105 shadow-[0_0_20px_rgba(0,210,255,0.5)]"
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
                <span className="font-bold text-white text-lg">{trainer.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Pokemon */}
        <div className="mb-12">
          <h2 className={`mb-6 text-center font-mono text-2xl font-bold uppercase tracking-widest transition-opacity duration-300 ${selectedTrainer ? 'text-white opacity-100 drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]' : 'text-zinc-600 opacity-50'}`}>
            Step 2: Choose Your Partner
          </h2>
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-500 ${
            !selectedTrainer ? "opacity-40 grayscale blur-sm pointer-events-none" : "opacity-100 grayscale-0 blur-none pointer-events-auto"
          }`}>
            {POKEMON.map((pokemon) => (
              <button
                key={pokemon.name}
                disabled={!selectedTrainer}
                onClick={() => setSelectedPokemon(pokemon)}
                className={`group flex flex-col items-center gap-3 rounded-xl border-2 bg-neutral-800 p-6 transition-all duration-300 w-48 ${
                  selectedPokemon?.name === pokemon.name
                    ? "border-primary scale-105 shadow-[0_0_20px_rgba(0,210,255,0.5)]"
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
                  <div className="text-xs text-text-muted mt-1">Moveset:</div>
                  <div className={`mt-0.5 text-sm ${MOVE_COLORS[pokemon.type]}`}>{pokemon.move}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={() => selectedTrainer && selectedPokemon && onStart(selectedTrainer, selectedPokemon)}
            disabled={!selectedTrainer || !selectedPokemon}
            className={`px-8 py-3 font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${
              selectedTrainer && selectedPokemon
                ? "bg-red-600 border border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:bg-red-500 hover:scale-105"
                : "bg-neutral-800 border border-neutral-700 text-neutral-500 cursor-not-allowed"
            }`}
          >
            BEGIN BATTLE ▶
          </button>
        </div>

      </div>
    </motion.div>
  );
}
