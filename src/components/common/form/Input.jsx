import { useFormContext } from 'react-hook-form';
import styles from './inputFields.module.css';

export default function Input({
  name,
  label = false,
  placeholder = '입력해 주세요',
  validations = {},
  type = 'text',
  className = '',
}) {
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useFormContext();

  const addError = errors[name] && styles.error;
  const text = (label && placeholder) || `${label}${placeholder}`;

  return (
    <div className={styles.Input}>
      {label && (
        <label className={styles['Input-label']} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={`${addError} ${className}`}
        {...register(name, {
          ...validations,
          onBlur: () => trigger(name),
          onChange: () => trigger(name),
        })}
        onFocus={() => clearErrors(name)}
        placeholder={label ? text : placeholder}
        type={type}
      />
      {errors && errors[name] && (
        <span className={styles['error-text']}>{errors[name].message}</span>
      )}
    </div>
  );
}
