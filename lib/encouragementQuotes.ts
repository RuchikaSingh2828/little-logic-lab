export const ENCOURAGEMENT_QUOTES = [
  "Great thinking builds great brains!",
  "Every puzzle makes you stronger!",
  "Curiosity is your superpower!",
  "Small steps lead to big ideas.",
  "Your brain loves a good challenge!",
  "Keep wondering — keep growing!",
  "Playing is learning in disguise!",
  "Questions are the start of discovery.",
  "Logic grows one move at a time.",
  "You're building focus with every try.",
  "Mistakes help your brain learn.",
  "Look closely — patterns are everywhere!",
];

export function getRandomEncouragementQuote(): string {
  const index = Math.floor(Math.random() * ENCOURAGEMENT_QUOTES.length);
  return ENCOURAGEMENT_QUOTES[index];
}
