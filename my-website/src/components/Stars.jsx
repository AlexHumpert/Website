import { useEffect, useRef } from 'react';
import { follow, lerp, prefersReducedMotion } from '../tactile/pointer';

// A sparse field of stars over the hero. They thin out toward the horizon,
// twinkle slowly, and slide a few pixels against the cursor for depth.
export default function Stars() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const calm = prefersReducedMotion();
    let stars = [];
    let width = 0;
    let height = 0;
    let ox = 0;
    let oy = 0;
    let visible = true;

    const seed = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.round((width * height) / 9000);
      stars = Array.from({ length: count }, () => {
        const y = Math.random() ** 1.7; // crowd toward the top of the sky
        return {
          x: Math.random() * width,
          y: y * height,
          size: 0.4 + Math.random() * 0.9,
          glow: (1 - y) ** 1.4 * (0.35 + Math.random() * 0.65),
          speed: 0.4 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          depth: 0.3 + Math.random() * 0.7,
        };
      });
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const ink = getComputedStyle(canvas).color;
      ctx.fillStyle = ink;
      stars.forEach((star) => {
        const twinkle = calm ? 1 : 0.65 + 0.35 * Math.sin(star.phase + (time / 1000) * star.speed);
        ctx.globalAlpha = star.glow * twinkle;
        ctx.beginPath();
        ctx.arc(star.x + ox * star.depth, star.y + oy * star.depth, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    seed();
    draw(0);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    const onResize = () => {
      seed();
      draw(performance.now());
    };
    window.addEventListener('resize', onResize);

    // Twinkling runs on its own slow clock; the pointer only adds the parallax.
    let px = 0.5;
    let py = 0.5;
    const stop = follow((p) => {
      px = p.x / window.innerWidth;
      py = p.y / window.innerHeight;
      return false;
    });

    let frame = 0;
    const animate = (time) => {
      if (visible) {
        ox = lerp(ox, (px - 0.5) * -14, 0.05);
        oy = lerp(oy, (py - 0.5) * -8, 0.05);
        draw(time);
      }
      frame = requestAnimationFrame(animate);
    };
    if (!calm) frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      stop();
    };
  }, []);

  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}
