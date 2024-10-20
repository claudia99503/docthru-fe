export default function Svg({
  name,
  width = '24',
  height,
  type = 'icon',
  isActive = false,
}) {
  const calculatedHeight = height ? height : width;

  const prefix = type === 'icon' ? 'ic' : 'img';

  return (
    <svg
      width={width}
      height={calculatedHeight}
      viewBox={`0 0 ${width} ${calculatedHeight}`}
      className={`Svg ${name} ${type} ${isActive ? styles.active : ''}`}
    >
      <use
        href={`/assets/${type}s_sprite.svg/#${prefix}_${name}`}
        className="icon-use"
      />
    </svg>
  );
}
