let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.15
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export function playCorrectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  playTone(523.25, 0.12, "sine", 0.12);
  setTimeout(() => playTone(659.25, 0.18, "sine", 0.12), 90);
}

export function playWrongSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  playTone(220, 0.08, "triangle", 0.1);
  setTimeout(() => playTone(185, 0.15, "triangle", 0.1), 70);
}
