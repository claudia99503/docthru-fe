import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './UpdateFeedbackForm.module.css';
import TextArea from '../common/form/TextArea';
import { FEEDBACK } from '@/variables/formValidation';

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
        <TextArea name="content" validations={FEEDBACK.CONTENT} />
        <div className={styles.btns}>
          <button variant="cancel" onClick={onClick} className="small">
            취소
          </button>
          <button
            variant="primary"
            disabled={!isValid}
            type="submit"
            className="small"
          >
            수정 완료
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
