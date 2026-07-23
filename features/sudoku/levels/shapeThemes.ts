export interface ShapeTheme {
  id: string;
  label: string;
  symbols: string[];
}

function shape(
  type: "circle" | "square" | "triangle" | "diamond" | "star" | "hexagon",
  color: string
) {
  return `shape:${type}:${color}`;
}

export const SHAPE_THEMES: ShapeTheme[] = [
  {
    id: "primary",
    label: "Bright Shapes",
    symbols: [
      shape("circle", "#EF4444"),
      shape("square", "#3B82F6"),
      shape("triangle", "#22C55E"),
      shape("diamond", "#A855F7"),
      shape("star", "#F59E0B"),
      shape("hexagon", "#06B6D4"),
    ],
  },
  {
    id: "pastel",
    label: "Soft Shapes",
    symbols: [
      shape("circle", "#FCA5A5"),
      shape("square", "#93C5FD"),
      shape("triangle", "#86EFAC"),
      shape("diamond", "#C4B5FD"),
      shape("star", "#FCD34D"),
      shape("hexagon", "#67E8F9"),
    ],
  },
  {
    id: "bold",
    label: "Bold Shapes",
    symbols: [
      shape("circle", "#DC2626"),
      shape("square", "#1D4ED8"),
      shape("triangle", "#15803D"),
      shape("diamond", "#7E22CE"),
      shape("star", "#D97706"),
      shape("hexagon", "#0891B2"),
    ],
  },
];

export function getShapeThemeById(id: string): ShapeTheme {
  return SHAPE_THEMES.find((theme) => theme.id === id) ?? SHAPE_THEMES[0];
}

export function getNextShapeTheme(currentId: string): ShapeTheme {
  const index = SHAPE_THEMES.findIndex((theme) => theme.id === currentId);
  const nextIndex = index === -1 ? 0 : (index + 1) % SHAPE_THEMES.length;
  return SHAPE_THEMES[nextIndex];
}
