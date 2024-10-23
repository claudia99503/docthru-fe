import { useFormContext } from 'react-hook-form';
import styles from './inputFields.module.css';

export default function TextArea({
  name,
  label = false,
  placeholder = '내용을 입력해 주세요',
  validations,
  className,
}) {
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useFormContext();

  const addError = errors[name] && styles.error;

  return (
    <div className={`${styles.TextArea}`}>
      {label && (
        <label htmlFor={name} className={styles['TextArea-label']}>
          {label}
        </label>
      )}
      <textarea
        className={`${addError} ${className}`}
        {...register(name, {
          ...validations,
          onChange: () => trigger(name),
        })}
        onFocus={() => {
          clearErrors(name);
        }}
        placeholder={placeholder}
      />
      {errors && errors[name] && (
        <span className={styles['error-text']}>{errors[name].message}</span>
      )}
    </div>
  );
}
