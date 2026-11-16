import { useEffect, useRef } from 'react';
import { follow, hasFinePointer, lerp, prefersReducedMotion } from '../tactile/pointer';

// A soft patch of coloured light behind a section. It breathes on its own and
// leans gently away from the cursor, like light shifting as you move your head.
export default function Glow({ from, to, className = '', depth = 28 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);

    let x = 0;
    let y = 0;
    const stop = follow((p) => {
      if (!visible || !p.seen) return false;
      const tx = (p.x / window.innerWidth - 0.5) * -depth;
      const ty = (p.y / window.innerHeight - 0.5) * -depth;
      x = lerp(x, tx, 0.06);
      y = lerp(y, ty, 0.06);
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      return Math.abs(x - tx) + Math.abs(y - ty) > 0.1;
    });

    return () => {
      observer.disconnect();
      stop();
    };
  }, [depth]);

  return (
    <div ref={ref} className={`glow ${className}`} aria-hidden="true">
      <div className="glow-light" style={{ '--glow-from': from, '--glow-to': to }} />
    </div>
  );
}
