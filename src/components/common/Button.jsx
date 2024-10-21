import styles from './Button.module.css';
import cn from '@/utils/clsx';

export default function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button-${variant}`],
        className && styles[className]
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
