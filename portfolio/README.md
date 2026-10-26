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

Metadata defaults to the verified public origin, `https://simonocampo.com`. Set `NEXT_PUBLIC_SITE_URL` only when deploying to a different intended public origin.

```bash
NEXT_PUBLIC_SITE_URL=https://simonocampo.com
```

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The optional battle launches with full Cinematic effects and keeps a subtle in-battle reduced-effects control available; core project, résumé, and contact links never require completing the game flow.

## Fonts and verification

Local Geist font subsets cover the portfolio's Latin text, punctuation, and arrows. Their original SIL license is included with the font files. After updating Geist, regenerate them with `python scripts/subset-fonts.py` in an environment with `fonttools` and `brotli` installed.

See [the final polish verification report](docs/portfolio-polish.md) for measured performance, browser coverage, and remaining deployment work.

## Sprite credits

- Animated [Nate](https://archives.bulbagarden.net/wiki/File:Spr_B2W2_Nate.png) and [Rosa](https://archives.bulbagarden.net/wiki/File:Spr_B2W2_Rosa.png) trainer sprites are Pokémon Black 2 and White 2 game sprites sourced from the Bulbagarden Archives and used here as attributed fan-portfolio material.
- Animated Pokémon battle sprites are sourced from the [PokéAPI sprite repository](https://github.com/PokeAPI/sprites) and localized under `public/pokemon`.
