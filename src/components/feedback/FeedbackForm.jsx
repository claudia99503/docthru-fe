import { useForm, FormProvider } from 'react-hook-form';
import TextArea from '../common/form/TextArea';
import styles from './FeedbackForm.module.css';
import { useCreateFeedback } from '@/service/mutations/work';
import { useRouter } from 'next/router';

export default function FeedbackForm() {
  const formMethods = useForm();
  const router = useRouter();
  const { id } = router.query;
  const s = styles;

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const { mutate } = useCreateFeedback(id);

  const handleFeedbackSubmit = (data) => {
    mutate(data);
    console.log(data);
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className={s.FeedbackForm}
        onSubmit={handleSubmit(handleFeedbackSubmit)}
      >
        <TextArea
          name="content"
          placeholder="피드백을 남겨주세요"
          className={s.textArea}
        />
        <button className={s.submitButton} type="submit" disabled={!isValid}>
          등록
        </button>
      </form>
    </FormProvider>
  );
}
