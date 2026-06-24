# Picture Sudoku — Engine & Theme Guide

## Overview

Picture Sudoku is a Latin-square puzzle for ages 3–4. Each row and column must contain exactly one of each picture symbol. The engine lives in `features/sudoku/` and is fully separated from UI.

## Generating a Puzzle

```typescript
import { generatePicturePuzzle } from "@/features/sudoku/generators/pictureSudokuGenerator";

const puzzle = generatePicturePuzzle({
  size: 3,           // 2 or 3
  difficulty: "easy", // "easy" | "medium" | "hard"
  themeId: "animals", // optional — random if omitted
});
```

### Puzzle Shape

```typescript
interface Puzzle {
  id: string;
  size: 2 | 3;
  difficulty: "easy" | "medium" | "hard";
  themeId: string;
  symbols: string[];              // emoji or image paths
  solution: string[][];           // complete answer grid
  givens: (string | null)[][];    // null = empty playable cell
  emptyCells: { row: number; col: number }[];
}
```

### Empty Cell Counts

| Size | Easy | Medium | Hard |
|------|------|--------|------|
| 2×2  | 1    | 2      | 2    |
| 3×3  | 3    | 4      | 6    |

## Validation

```typescript
import {
  isValidPlacement,
  isBoardComplete,
  isSolved,
} from "@/features/sudoku/validators/sudokuValidator";

isValidPlacement(board, row, col, symbol, size); // row/col uniqueness
isBoardComplete(board);                           // no nulls remaining
isSolved(board, solution);                        // matches answer
```

## Swapping Emoji for Custom Art

Themes are defined in `features/sudoku/levels/pictureThemes.ts`:

```typescript
export const PICTURE_THEMES = [
  {
    id: "animals",
    label: "Animal Friends",
    symbols: ["🐶", "🐱", "🐰"], // replace with image paths
  },
];
```

To use images, set `symbols` to public paths:

```typescript
symbols: ["/images/sheep-egg.png", "/images/sheep-jump.png", "/images/sheep-basket.png"]
```

`PictureCard` automatically renders `<img>` when a symbol starts with `/`.

## Adding a New Theme

1. Add images to `public/images/<theme>/`
2. Add entry to `PICTURE_THEMES` in `pictureThemes.ts`
3. No engine changes needed — generator picks it up automatically

## Running Tests

```bash
npm test
```

Tests cover latin square validity, empty cell counts, and validator logic.
