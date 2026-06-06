const ANIMATIONS = ['orbFloat1', 'orbFloat2', 'orbFloat3', 'orbFloat4'];

export default function Orb({ innerColor, outerColor, style = {}, animationIndex = 0, duration = 10 }) {
  const anim = ANIMATIONS[animationIndex % ANIMATIONS.length];
  return (
    <div
      className="orb"
      style={{
        background: `radial-gradient(circle at 40% 40%, ${innerColor}, ${outerColor} 70%, transparent 100%)`,
        animation: `${anim} ${duration}s ease-in-out infinite alternate`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
