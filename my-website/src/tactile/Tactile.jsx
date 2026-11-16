import { useEffect, useRef } from 'react';
import { sound, unlockSound } from './sound';
import { follow, hasFinePointer, lerp, pointer, prefersReducedMotion, wake } from './pointer';

// The site's sense of touch, mounted once. Components opt in with attributes:
//
//   data-spot       a soft light follows the cursor across the element
//   data-magnetic   the element leans a few pixels toward the cursor
//   data-tilt       the element tips in 3D under the cursor
//   data-tick="n"   plays step n of the scale when the cursor arrives
//   data-preview    an image URL that floats beside the cursor while hovering
//   data-sound      "none" silences the press, "own" means the component
//                   plays its own sound on click (press still plays)
//
// Every link and button gets the press sound without opting in.

const PRESSABLE = 'a[href], button:not(:disabled), summary, [role="button"]';

export default function Tactile() {
  const haloRef = useRef(null);
  const previewRef = useRef(null);
  const previewImgRef = useRef(null);

  useEffect(() => {
    const fine = hasFinePointer();
    const calm = prefersReducedMotion();
    const halo = haloRef.current;
    const preview = previewRef.current;
    const previewImg = previewImgRef.current;

    let magnet = null;
    let tilted = null;
    let ticked = null;
    let previewing = null;

    const releaseMagnet = () => {
      if (!magnet) return;
      magnet.classList.remove('is-pulled');
      magnet.style.removeProperty('--mx');
      magnet.style.removeProperty('--my');
      magnet = null;
    };
    const releaseTilt = () => {
      if (!tilted) return;
      tilted.classList.remove('is-tilting');
      tilted.style.removeProperty('--rx');
      tilted.style.removeProperty('--ry');
      tilted = null;
    };
    const hidePreview = () => {
      previewing = null;
      preview.classList.remove('is-visible');
    };

    const onPointerDown = (event) => {
      unlockSound();
      const target = event.target.closest?.(PRESSABLE);
      if (!target || target.dataset.sound === 'none') return;
      sound.press();
      if (event.pointerType === 'touch') navigator.vibrate?.(8);
    };

    const onClick = (event) => {
      const target = event.target.closest?.(PRESSABLE);
      if (!target || target.dataset.sound) return;
      sound.release();
    };

    const onKeyDown = () => unlockSound();

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const el = event.target;
      if (!el.closest) return;

      const spot = el.closest('[data-spot]');
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty('--sx', `${event.clientX - rect.left}px`);
        spot.style.setProperty('--sy', `${event.clientY - rect.top}px`);
      }

      if (calm) return;

      const nextMagnet = el.closest('[data-magnetic]');
      if (nextMagnet !== magnet) releaseMagnet();
      if (nextMagnet) {
        magnet = nextMagnet;
        const rect = magnet.getBoundingClientRect();
        const strength = Number(magnet.dataset.magnetic) || 0.3;
        magnet.classList.add('is-pulled');
        magnet.style.setProperty('--mx', `${(event.clientX - (rect.left + rect.width / 2)) * strength}px`);
        magnet.style.setProperty('--my', `${(event.clientY - (rect.top + rect.height / 2)) * strength}px`);
      }

      const nextTilt = el.closest('[data-tilt]');
      if (nextTilt !== tilted) releaseTilt();
      if (nextTilt) {
        tilted = nextTilt;
        const rect = tilted.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        const max = Number(tilted.dataset.tilt) || 3;
        tilted.classList.add('is-tilting');
        tilted.style.setProperty('--ry', `${px * max * 2}deg`);
        tilted.style.setProperty('--rx', `${-py * max * 2}deg`);
      }
    };

    const onPointerOver = (event) => {
      if (event.pointerType === 'touch') return;
      const el = event.target;
      if (!el.closest) return;

      halo.classList.toggle('is-near', Boolean(el.closest(PRESSABLE)));

      const tick = el.closest('[data-tick]');
      if (tick !== ticked) {
        ticked = tick;
        if (tick) sound.tick(Number(tick.dataset.tick) || 0);
      }

      const withPreview = el.closest('[data-preview]');
      if (withPreview !== previewing) {
        if (withPreview && withPreview.dataset.preview) {
          previewing = withPreview;
          previewImg.src = withPreview.dataset.preview;
          preview.classList.add('is-visible');
          wake();
        } else {
          hidePreview();
        }
      }
    };

    const onLeaveWindow = () => {
      releaseMagnet();
      releaseTilt();
      hidePreview();
      ticked = null;
      halo.classList.remove('is-awake', 'is-near');
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown, { passive: true });
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeaveWindow);

    // The halo and the preview card trail the cursor with a little inertia.
    let hx = pointer.x;
    let hy = pointer.y;
    let px = pointer.x;
    let py = pointer.y;
    const stopFollowing = fine
      ? follow((p) => {
          if (!p.seen) return false;
          halo.classList.add('is-awake');
          const ease = calm ? 1 : 0.14;
          hx = lerp(hx, p.x, ease);
          hy = lerp(hy, p.y, ease);
          halo.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;

          px = lerp(px, p.x, calm ? 1 : 0.2);
          py = lerp(py, p.y, calm ? 1 : 0.2);
          if (previewing) preview.style.transform = `translate3d(${px}px, ${py}px, 0)`;

          return Math.abs(hx - p.x) + Math.abs(hy - p.y) + Math.abs(px - p.x) + Math.abs(py - p.y) > 0.4;
        })
      : () => {};

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
      stopFollowing();
    };
  }, []);

  return (
    <>
      <div ref={haloRef} className="halo" aria-hidden="true" />
      <div ref={previewRef} className="hover-preview" aria-hidden="true">
        <div className="hover-preview-card">
          <img ref={previewImgRef} alt="" />
        </div>
      </div>
    </>
  );
}
