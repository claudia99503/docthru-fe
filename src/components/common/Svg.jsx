import cn from '@/utils/clsx';

export default function Svg({
  name,
  width = '24',
  height,
  type = 'icon',
  className,
  addName = '',
  style
}) {
  const calculatedHeight = height || width;

  const prefix = type === 'icon' ? 'ic' : 'img';

  return (
    <svg
      width={width}
      height={calculatedHeight}
      className={cn('Svg', className)}
      aria-label={name}
      style={style}
    >
      <use
        href={`/assets/${type}s_sprite.svg/#${prefix}_${name}`}
        className={cn(name)}
      />
      {addName && (
        <use
          href={`/assets/${type}s_sprite.svg/#${prefix}_${addName}`}
          className={cn(addName)}
        />
      )}
    </svg>
  );
}
