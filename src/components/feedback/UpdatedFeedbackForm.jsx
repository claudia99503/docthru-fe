import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './UpdateFeedbackForm.module.css';
import TextArea from '../common/form/TextArea';
import { FEEDBACK } from '@/variables/formValidation';
import Button from '../common/Button';

export default function UpdateFeedbackForm({ onSubmit, initialData, onClick }) {
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
        <TextArea
          name="content"
          validations={FEEDBACK.CONTENT}
          className={styles.textarea}
        />
        <div className={styles['button-container']}>
          <Button
            variant="cancel"
            onClick={onClick}
            className={styles.button}
            borderRadius="8px"
            fontSize="14px"
            padding="4px 10px"
          >
            취소
          </Button>
          <Button
            disabled={!isValid}
            type="submit"
            className={styles.button}
            borderRadius="8px"
            fontSize="14px"
            padding="4px 10px"
            variant="black"
          >
            수정 완료
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
