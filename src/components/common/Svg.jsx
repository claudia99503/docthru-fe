export default function Svg({
  name,
  width = '24',
  height,
  type = 'icon',
  ...props
}) {
  const calculatedHeight = height ? height : width;

  const prefix = type === 'icon' ? 'ic' : 'img';

  return (
    <svg
      {...props}
      width={width}
      height={calculatedHeight}
      viewBox={`0 0 ${width} ${calculatedHeight}`}
    >
      <use href={`/assets/sprite.svg/#${prefix}_${name}`} />
    </svg>
  );
}
