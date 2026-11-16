// Every sound on the site is synthesized here with the Web Audio API: no files,
// nothing to download. All pitches come from one pentatonic scale, so any two
// sounds played back to back still sound like they belong together.

const STORAGE_KEY = 'sound';
const ROOT = 587.33; // D5
const SCALE = [0, 2, 4, 7, 9]; // major pentatonic, in semitones

let ctx = null;
let master = null;
let noiseBuffer = null;
let unlocked = false; // browsers only allow audio after a real gesture
let enabled = readPreference();
const listeners = new Set();

function readPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

function note(step) {
  const octave = Math.floor(step / SCALE.length);
  const degree = ((step % SCALE.length) + SCALE.length) % SCALE.length;
  return ROOT * 2 ** ((SCALE[degree] + 12 * octave) / 12);
}

function audio() {
  if (!enabled || !unlocked) return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = 0.55;
    // A soft ceiling so quick runs of sounds never stack into something harsh.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -18;
    limiter.ratio.value = 6;
    master.connect(limiter);
    limiter.connect(ctx.destination);

    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// A pitched voice with a fast attack and an exponential tail.
function tone({ freq, to, dur = 0.08, gain = 0.08, type = 'sine', delay = 0, attack = 0.004 }) {
  const c = audio();
  if (!c) return;
  const start = c.currentTime + delay;
  const osc = c.createOscillator();
  const amp = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, start + dur);
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + attack);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(amp);
  amp.connect(master);
  osc.start(start);
  osc.stop(start + dur + 0.03);
}

// Filtered noise: the "material" in a click, or the air in a page turn.
function hiss({ freq = 2400, to, q = 1.2, dur = 0.03, gain = 0.05, delay = 0 }) {
  const c = audio();
  if (!c) return;
  const start = c.currentTime + delay;
  const source = c.createBufferSource();
  source.buffer = noiseBuffer;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = q;
  filter.frequency.setValueAtTime(freq, start);
  if (to) filter.frequency.exponentialRampToValueAtTime(to, start + dur);
  const amp = c.createGain();
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(gain, start + 0.004);
  amp.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  source.connect(filter);
  filter.connect(amp);
  amp.connect(master);
  source.start(start, Math.random() * 0.3);
  source.stop(start + dur + 0.03);
}

let lastTick = 0;

export const sound = {
  // Finger down: a short, low, woody "tok".
  press() {
    // A few cents of drift each time, so repeated clicks never sound stamped out.
    const drift = 2 ** ((Math.random() * 60 - 30) / 1200);
    tone({ freq: 190 * drift, to: 120 * drift, dur: 0.045, gain: 0.09 });
    hiss({ freq: 2600, dur: 0.018, gain: 0.035 });
  },
  // Finger up on something ordinary: the lighter half of the click.
  release() {
    tone({ freq: note(2), dur: 0.05, gain: 0.03, type: 'triangle' });
    hiss({ freq: 4200, dur: 0.012, gain: 0.02 });
  },
  // Passing over a nav link. Each link has its own step of the scale, so
  // sweeping across the nav plays a little run. Kept off long lists on purpose,
  // and rate-limited so fast sweeps stay calm.
  tick(step = 0) {
    const now = performance.now();
    if (now - lastTick < 80) return;
    lastTick = now;
    tone({ freq: note(step), dur: 0.07, gain: 0.022 });
  },
  toggle(on) {
    const [first, second] = on ? [0, 2] : [2, 0];
    tone({ freq: note(first), dur: 0.07, gain: 0.06, type: 'triangle' });
    tone({ freq: note(second), dur: 0.1, gain: 0.06, type: 'triangle', delay: 0.065 });
  },
  open() {
    tone({ freq: 294, to: 440, dur: 0.11, gain: 0.05 });
    hiss({ freq: 900, to: 2800, q: 0.8, dur: 0.12, gain: 0.02 });
  },
  close() {
    tone({ freq: 440, to: 294, dur: 0.1, gain: 0.045 });
    hiss({ freq: 2400, to: 800, q: 0.8, dur: 0.1, gain: 0.018 });
  },
  // Moving to another page: air, then a single low note landing.
  navigate() {
    hiss({ freq: 700, to: 2600, q: 0.7, dur: 0.16, gain: 0.022 });
    tone({ freq: note(-5), dur: 0.16, gain: 0.035, delay: 0.05 });
  },
  success() {
    tone({ freq: note(2), dur: 0.08, gain: 0.05, type: 'triangle' });
    tone({ freq: note(4), dur: 0.16, gain: 0.05, type: 'triangle', delay: 0.07 });
  },
  // Day breaks upward, night settles downward.
  theme(day) {
    const steps = day ? [-5, -3, 0, 2] : [2, 0, -3, -5];
    steps.forEach((step, i) => {
      tone({ freq: note(step), dur: 0.5, gain: 0.04, type: 'triangle', delay: i * 0.07, attack: 0.012 });
    });
    hiss({ freq: day ? 500 : 2400, to: day ? 3000 : 500, q: 0.5, dur: 0.4, gain: 0.012 });
  },
};

// Called from the first real pointer or key event, so audio is allowed to start.
export function unlockSound() {
  unlocked = true;
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(next) {
  enabled = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
  } catch {
    // Storage blocked: the choice just won't survive a reload.
  }
  listeners.forEach((listener) => listener());
  if (next) sound.toggle(true);
}

export function subscribeSound(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
