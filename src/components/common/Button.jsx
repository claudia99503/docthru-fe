import styles from './Button.module.css';
import cn from '@/utils/clsx';

export default function Button({
  children,
  variant = 'black',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  borderRadius = '12px',
  width = '',
  height = '',
  padding = '',
  fontSize = '',
  fontWeight = '',
}) {
  return (
    <button
      className={cn(styles.button, styles[`button-${variant}`], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ borderRadius, width, height, padding, fontSize, fontWeight }}
    >
      {children}
    </button>
  );
}
