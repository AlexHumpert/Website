import { useEffect, useId, useRef } from 'react';
import { clamp, follow, hasFinePointer, lerp, prefersReducedMotion } from './pointer';

// The lens: two circles, gold where they meet. It is the site's mark, and it
// watches the cursor. Both circles lean toward the pointer, and the closer the
// pointer gets, the more they overlap, so the gold swells as you approach.
//
// Drawn in a 34 x 20 box. `reach` is how far away (in px) the lens starts to
// notice the cursor.
const LEFT = 11;
const RIGHT = 23;
const MID = 17;

export default function LensMark({ className = '', reach = 520, lean = 1.4, squeeze = 2.6 }) {
  const clipId = useId();
  const svgRef = useRef(null);
  const clipCircleRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const goldRef = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined;

    let dx = 0;
    let dy = 0;
    let near = 0;

    return follow((p) => {
      const svg = svgRef.current;
      if (!svg || !p.seen) return false;
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) return false;

      const vx = p.x - (rect.left + rect.width / 2);
      const vy = p.y - (rect.top + rect.height / 2);
      const distance = Math.hypot(vx, vy) || 1;
      const targetNear = 1 - clamp(distance / reach, 0, 1);
      const pull = clamp(distance / 80, 0, 1) * lean;
      const tx = (vx / distance) * pull;
      const ty = (vy / distance) * pull;

      dx = lerp(dx, tx, 0.12);
      dy = lerp(dy, ty, 0.12);
      near = lerp(near, targetNear, 0.1);

      const left = LEFT + dx + near * squeeze;
      const right = RIGHT + dx - near * squeeze;
      const y = 10 + dy;
      leftRef.current.setAttribute('cx', left);
      leftRef.current.setAttribute('cy', y);
      clipCircleRef.current.setAttribute('cx', left);
      clipCircleRef.current.setAttribute('cy', y);
      rightRef.current.setAttribute('cx', right);
      rightRef.current.setAttribute('cy', y);
      goldRef.current.setAttribute('cx', right);
      goldRef.current.setAttribute('cy', y);

      return Math.abs(dx - tx) + Math.abs(dy - ty) + Math.abs(near - targetNear) > 0.004;
    });
  }, [reach, lean, squeeze]);

  return (
    <svg ref={svgRef} className={`lens ${className}`} viewBox={`${MID - 17} 0 34 20`} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle ref={clipCircleRef} cx={LEFT} cy="10" r="8.5" />
        </clipPath>
      </defs>
      <circle ref={goldRef} className="lens-gold" cx={RIGHT} cy="10" r="8.5" clipPath={`url(#${clipId})`} />
      <circle ref={leftRef} className="lens-ring" cx={LEFT} cy="10" r="8.5" />
      <circle ref={rightRef} className="lens-ring" cx={RIGHT} cy="10" r="8.5" />
    </svg>
  );
}
