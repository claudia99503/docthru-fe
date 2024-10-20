import cn from '@/utils/clsx';

export default function Svg({
  name,
  width = '24',
  height,
  type = 'icon',
  isActive = false,
  className,
}) {
  const calculatedHeight = height || width;

  const prefix = type === 'icon' ? 'ic' : 'img';

  return (
    <svg
      width={width}
      height={calculatedHeight}
      className={cn(name, type, className, { active: isActive })}
    >
      <use href={`/assets/${type}s_sprite.svg/#${prefix}_${name}`} />
    </svg>
  );
}
