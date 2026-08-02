"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Swords } from "lucide-react";
import FullscreenDialog from "@/components/FullscreenDialog";
import {
  POKEMON,
  TRAINERS,
  type Pokemon,
  type Trainer,
} from "@/data/battle";

const MOVE_COLORS = {
  water: "text-cyan-300",
  grass: "text-green-300",
  fire: "text-orange-300",
};

interface SelectionScreenProps {
  onCancel: () => void;
  onStart: (trainer: Trainer, pokemon: Pokemon) => void;
}

export default function SelectionScreen({ onCancel, onStart }: SelectionScreenProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const canStart = Boolean(selectedTrainer && selectedPokemon);

  return (
    <FullscreenDialog
      onClose={onCancel}
      labelledBy="selection-title"
      className="bg-[#02070d]"
      contentClassName="h-full overflow-y-auto overscroll-contain px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4"
      showBackdrop={false}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex min-h-full w-full max-w-4xl items-start justify-center sm:py-6"
      >
        <div className="w-full overflow-hidden rounded-2xl border border-primary/45 bg-[#07111d]/96 shadow-[0_0_44px_rgba(0,210,255,0.14)]">
          <header className="border-b border-white/10 px-4 py-4 text-center sm:px-8 sm:py-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/65">Final encounter setup</p>
            <h2 id="selection-title" className="mt-1 text-xl font-black uppercase tracking-[0.1em] text-white sm:text-2xl">
              Choose your team
            </h2>
          </header>

          <div className="space-y-8 p-4 sm:space-y-10 sm:p-8">
            <fieldset>
              <legend className="mb-4 w-full text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
                <span className="text-primary">01</span> / Choose your trainer
              </legend>
              <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:gap-5" role="radiogroup" aria-label="Trainer">
                {TRAINERS.map((trainer) => {
                  const selected = selectedTrainer?.name === trainer.name;
                  return (
                    <button
                      key={trainer.name}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedTrainer(trainer)}
                      className={`relative flex min-h-48 min-w-0 flex-col items-center justify-end gap-2 overflow-hidden rounded-xl border bg-white/[0.035] p-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-60 sm:gap-3 sm:p-5 ${
                        selected
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                          : "border-white/10 hover:border-white/25 hover:bg-white/[0.055]"
                      }`}
                    >
                      <span aria-hidden className={`absolute inset-x-6 bottom-9 h-12 rounded-[50%] bg-primary/10 blur-xl transition-opacity ${selected ? "opacity-100" : "opacity-35"}`} />
                      <span className="relative block size-36 sm:size-44">
                        <Image
                          src={trainer.animatedSprite}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 144px, 176px"
                          unoptimized
                          className="object-contain drop-shadow-[0_0_18px_rgba(0,210,255,0.25)]"
                          style={{ imageRendering: "pixelated" }}
                        />
                      </span>
                      <span className="text-sm font-bold text-white sm:text-base">{trainer.name}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset disabled={!selectedTrainer} className="disabled:pointer-events-none">
              <legend className={`mb-4 w-full text-center font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors sm:text-sm ${selectedTrainer ? "text-white" : "text-slate-600"}`}>
                <span className={selectedTrainer ? "text-primary" : "text-slate-700"}>02</span> / Choose your partner
              </legend>
              <div className={`grid grid-cols-3 gap-2 transition-all sm:gap-4 ${selectedTrainer ? "opacity-100" : "opacity-25 grayscale"}`} role="radiogroup" aria-label="Partner Pokémon">
                {POKEMON.map((pokemon) => {
                  const selected = selectedPokemon?.name === pokemon.name;
                  return (
                    <button
                      key={pokemon.name}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedPokemon(pokemon)}
                      className={`flex min-w-0 flex-col items-center gap-2 rounded-xl border bg-white/[0.035] px-1.5 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:py-5 ${
                        selected
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,210,255,0.2)]"
                          : "border-white/10 hover:border-white/25 hover:bg-white/[0.055]"
                      }`}
                    >
                      <Image
                        src={pokemon.frontSprite}
                        alt=""
                        width={80}
                        height={80}
                        unoptimized
                        className="h-14 w-auto max-w-full object-contain sm:h-20"
                        style={{ imageRendering: "pixelated" }}
                      />
                      <span className="max-w-full break-words text-center text-[11px] font-bold text-white sm:text-sm">{pokemon.name}</span>
                      <span className={`max-w-full break-words text-center font-mono text-[8px] font-bold leading-tight sm:text-xs ${MOVE_COLORS[pokemon.moveType]}`}>
                        {pokemon.move}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

          </div>

          <footer className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-white/10 bg-[#07111d]/95 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <button type="button" onClick={onCancel} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <ArrowLeft size={17} /> Cancel
            </button>
            <button
              type="button"
              disabled={!canStart}
              onClick={() => selectedTrainer && selectedPokemon && onStart(selectedTrainer, selectedPokemon)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-red-400/70 bg-red-500/15 px-6 text-sm font-black uppercase tracking-[0.13em] text-white shadow-[0_0_20px_rgba(239,68,68,0.16)] transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-slate-600 disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <Swords size={18} /> Begin battle
            </button>
          </footer>
        </div>
      </motion.div>
    </FullscreenDialog>
  );
}
