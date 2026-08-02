# Neural Water Gym

Simon Ocampo Millan's interactive portfolio: a responsive, game-inspired tour through projects, experience, education, and technical skills.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site supports direct chamber hashes:

- `#home`
- `#projects`
- `#experience`
- `#skills`

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the production origin so generated Open Graph metadata resolves to the deployed domain.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The optional battle launches with full Cinematic effects and keeps a subtle in-battle reduced-effects control available; core project, résumé, and contact links never require completing the game flow.

## Sprite credits

- Animated [Nate](https://archives.bulbagarden.net/wiki/File:Spr_B2W2_Nate.png) and [Rosa](https://archives.bulbagarden.net/wiki/File:Spr_B2W2_Rosa.png) trainer sprites are Pokémon Black 2 and White 2 game sprites sourced from the Bulbagarden Archives and used here as attributed fan-portfolio material.
- Animated Pokémon battle sprites are sourced from the [PokéAPI sprite repository](https://github.com/PokeAPI/sprites) and localized under `public/pokemon`.
