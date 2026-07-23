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

function playClapBurst(ctx: AudioContext, startTime: number, volume = 0.18) {
  const duration = 0.08;
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(startTime);
  source.stop(startTime + duration);
}

/** ~1s clap + cheer for puzzle completion. */
export function playCelebrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  const t = ctx.currentTime;
  const clapOffsets = [0, 0.09, 0.18, 0.28, 0.4, 0.52, 0.66, 0.8];
  clapOffsets.forEach((offset, i) => {
    playClapBurst(ctx, t + offset, 0.14 + (i % 3) * 0.02);
  });

  // Soft ascending cheer tones over the same second
  const cheerNotes = [
    { freq: 523.25, at: 0.05 },
    { freq: 659.25, at: 0.22 },
    { freq: 783.99, at: 0.4 },
    { freq: 1046.5, at: 0.6 },
  ];
  cheerNotes.forEach(({ freq, at }) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, t + at);
    gain.gain.setValueAtTime(0.08, t + at);
    gain.gain.exponentialRampToValueAtTime(0.001, t + at + 0.28);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(t + at);
    oscillator.stop(t + at + 0.28);
  });
}
