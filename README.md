# Little Logic Lab

Little Logic Lab is an educational platform for children aged 3–7 that develops logical reasoning through carefully designed activities. The experience is calm and Montessori-inspired — no streaks, scores, or addictive mechanics.

## Goals

- Develop logical reasoning
- Improve pattern recognition
- Strengthen problem-solving abilities
- Enhance concentration and memory
- Make learning playful and engaging

## Current Prototype

**Picture Sudoku** for ages 3–4 is playable now:

- 2×2 and 3×3 grids with emoji picture cards
- Easy, Medium, and Hard difficulties
- Drag-and-drop + tap-to-place interaction
- Calm educational feedback
- Session completion screen with healthy stopping points

## Planned Activities

- Pattern Completion
- Mini Sudoku
- Shape Matching
- Sequence Builder
- Odd One Out
- Memory Games
- Visual Reasoning Puzzles
- Sorting & Classification
- Maze Challenges
- Number & Logic Games

## Live

Play at [https://sudokid.in](https://sudokid.in).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run sudoku engine unit tests |
| `npm run lint` | ESLint |

## Project Structure

```
app/                    # Next.js pages
features/sudoku/        # Sudoku engine + UI components
docs/GameIdeas.md       # Living backlog of all activity ideas
docs/picture-sudoku.md  # Engine API + theme swap guide
```

## Design Principles

- Calm learning over screen time maximization
- Confidence building with gentle feedback
- No gamification (no XP, coins, streaks, leaderboards)
- Short meaningful sessions (5–10 minutes)
- Large touch targets, soft colors, minimal animation

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- @dnd-kit (drag-and-drop)
- Vitest (engine tests)

## Documentation

- [Game Ideas Backlog](docs/GameIdeas.md) — all planned activities
- [Picture Sudoku Guide](docs/picture-sudoku.md) — engine API and custom art swap
