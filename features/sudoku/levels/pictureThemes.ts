export interface PictureTheme {
  id: string;
  label: string;
  symbols: string[];
}

export const PICTURE_THEMES: PictureTheme[] = [
  {
    id: "animals",
    label: "Animal Friends",
    symbols: ["🐶", "🐱", "🐰", "🐻", "🦊"],
  },
  {
    id: "farm",
    label: "Farm Friends",
    symbols: ["🐮", "🐷", "🐑", "🐔", "🐴"],
  },
  {
    id: "ocean",
    label: "Ocean Friends",
    symbols: ["🐠", "🐙", "🐳", "🐬", "🦀"],
  },
  {
    id: "birds",
    label: "Bird Buddies",
    symbols: ["🐦", "🦆", "🐧", "🦜", "🦩"],
  },
  {
    id: "bugs",
    label: "Bug Buddies",
    symbols: ["🐝", "🦋", "🐞", "🐛", "🐜"],
  },
  {
    id: "transport",
    label: "Things That Go",
    symbols: ["✈️", "🚗", "🚂", "🚢", "🚲"],
  },
  {
    id: "sky",
    label: "Up in the Sky",
    symbols: ["☁️", "🚁", "🚀", "🎈", "🌈"],
  },
  {
    id: "homes",
    label: "Cozy Homes",
    symbols: ["🏠", "🏡", "🏰", "🏕️", "⛺"],
  },
  {
    id: "trees",
    label: "Tree Town",
    symbols: ["🌳", "🌲", "🌴", "🌵", "🍀"],
  },
  {
    id: "flowers",
    label: "Flower Garden",
    symbols: ["🌸", "🌻", "🌷", "🌺", "🌼"],
  },
  {
    id: "smiles",
    label: "Happy Faces",
    symbols: ["😀", "😊", "😍", "😎", "🤩"],
  },
  {
    id: "feelings",
    label: "Silly Faces",
    symbols: ["😄", "😜", "🤗", "😴", "🤔"],
  },
  {
    id: "fruits",
    label: "Fruit Basket",
    symbols: ["🍎", "🍌", "🍇", "🍓", "🍊"],
  },
  {
    id: "treats",
    label: "Yummy Treats",
    symbols: ["🍕", "🍦", "🧁", "🍪", "🍩"],
  },
  {
    id: "weather",
    label: "Sunny & Rainy",
    symbols: ["☀️", "🌧️", "⛄", "🌈", "💨"],
  },
  {
    id: "space",
    label: "Outer Space",
    symbols: ["🌙", "⭐", "🪐", "🛸", "👽"],
  },
  {
    id: "sports",
    label: "Play Time",
    symbols: ["⚽", "🏀", "🎾", "🏈", "⚾"],
  },
  {
    id: "music",
    label: "Music Time",
    symbols: ["🎵", "🎸", "🥁", "🎹", "🎺"],
  },
];

export function getThemeById(id: string): PictureTheme {
  return PICTURE_THEMES.find((t) => t.id === id) ?? PICTURE_THEMES[0];
}

export function getNextTheme(currentId: string): PictureTheme {
  const index = PICTURE_THEMES.findIndex((t) => t.id === currentId);
  const nextIndex = (index + 1) % PICTURE_THEMES.length;
  return PICTURE_THEMES[nextIndex];
}
