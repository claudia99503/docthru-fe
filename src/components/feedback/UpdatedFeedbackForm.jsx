import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './UpdateFeedbackForm.module.css';
import TextArea from '../common/form/TextArea';
import { FEEDBACK } from '@/variables/formValidation';
import Button from '../common/Button';
import cn from '@/utils/clsx';

export default function UpdateFeedbackForm({
  onSubmit,
  initialData,
  onClick,
  className,
}) {
  const formMethods = useForm();

  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = formMethods;

  useEffect(() => {
    if (initialData) {
      reset({
        content: initialData.content || '',
      });
    }
  }, [reset, initialData]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.UpdateFeedbackForm}
      >
        <div className={cn(styles['button-container'], className)}>
          <button variant="cancel" onClick={onClick} className={styles.cancel}>
            취소
          </button>
          <Button
            disabled={!isValid}
            type="submit"
            className={styles.update}
            borderRadius="8px"
            fontSize="14px"
            padding="4px 10px"
            variant="black"
          >
            수정 완료
          </Button>
        </div>
        <TextArea
          name="content"
          validations={FEEDBACK.CONTENT}
          className={styles.textarea}
        />
      </form>
    </FormProvider>
  );
}
