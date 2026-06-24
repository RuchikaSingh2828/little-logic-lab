import confetti from "canvas-confetti";

const CALM_COLORS = ["#A8D4E6", "#B8C9A8", "#E8A598", "#D4C5E2", "#FDF8F3"];

export function fireCelebrationConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const duration = 1500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: CALM_COLORS,
      ticks: 120,
      gravity: 0.8,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: CALM_COLORS,
      ticks: 120,
      gravity: 0.8,
      scalar: 0.9,
      disableForReducedMotion: true,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
