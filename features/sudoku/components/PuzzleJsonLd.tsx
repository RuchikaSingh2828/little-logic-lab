import { SUDOKU_MODE_CONFIG } from "../config/sudokuModes";
import type { Difficulty, GridSize, SudokuMode } from "../types/sudoku.types";
import { SITE_URL } from "@/lib/site";

export function PuzzleJsonLd({
  mode,
  size,
  difficulty,
}: {
  mode: SudokuMode;
  size: GridSize;
  difficulty: Difficulty;
}) {
  const config = SUDOKU_MODE_CONFIG[mode];
  const difficultyLabel =
    difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const pageUrl = `${SITE_URL}${config.hrefPrefix}/${size}/${difficulty}`;
  const name = `${config.title} ${size}×${size} — ${difficultyLabel}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Sudoku",
            item: `${SITE_URL}/sudoku`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: config.title,
            item: `${SITE_URL}${config.hrefPrefix}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${size}×${size} ${difficultyLabel}`,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebApplication",
        name,
        url: pageUrl,
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        description: config.instructions,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
