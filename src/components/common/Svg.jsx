export default function Svg({
  name,
  width = '24',
  height,
  type = 'icon',
  className = 'Svg',
  isActive = false,
  ...props
}) {
  const calculatedHeight = height ? height : width;

  const prefix = type === 'icon' ? 'ic' : 'img';

  return (
    <svg
      {...props}
      height={calculatedHeight}
      viewBox={`0 0 ${width} ${calculatedHeight}`}
      className={`${className} ${isActive ? styles.active : ''}`}
    >
      <use href={`/assets/sprite.svg/#${prefix}_${name}`} />
    </svg>
  );
}
