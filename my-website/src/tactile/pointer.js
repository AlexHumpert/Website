// One shared pointer position and one animation loop for everything that
// follows the mouse (the halo, the lens, the glows, the preview card), so the
// page never runs more than a single requestAnimationFrame at a time.

export const pointer = {
  x: typeof window === 'undefined' ? 0 : window.innerWidth / 2,
  y: typeof window === 'undefined' ? 0 : window.innerHeight / 3,
  seen: false, // true once a real mouse has moved
};

const followers = new Set();
let frame = 0;

function loop(time) {
  frame = 0;
  let stillMoving = false;
  followers.forEach((follow) => {
    if (follow(pointer, time) === true) stillMoving = true;
  });
  if (stillMoving) frame = requestAnimationFrame(loop);
}

export function wake() {
  if (!frame) frame = requestAnimationFrame(loop);
}

// `follow(pointer, time)` returns true while it still has easing left to do.
export function follow(fn) {
  followers.add(fn);
  wake();
  return () => followers.delete(fn);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.seen = true;
      wake();
    },
    { passive: true }
  );
  // Things anchored to the page move under a still cursor when it scrolls.
  window.addEventListener('scroll', wake, { passive: true });
}

export const lerp = (from, to, amount) => from + (to - from) * amount;
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
