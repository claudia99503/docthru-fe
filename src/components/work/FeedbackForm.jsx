import { useForm, FormProvider } from 'react-hook-form';
import TextArea from '../common/form/TextArea';
import styles from './FeedbackForm.module.css';
import Svg from '../common/Svg';

export default function FeedbackForm() {
  const formMethods = useForm();

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  const handleNewCommentSubmit = (data) => {
    const newComment = { content: data['create-comment-content'] };
    mutate(newComment);
  };

  const handleResetAfterSubmit = (data) => {
    handleNewCommentSubmit(data);
    reset();
  };

  return (
    <FormProvider {...formMethods}>
      <form
        className={styles.FeedbackForm}
        onSubmit={handleSubmit(handleResetAfterSubmit)}
      >
        <TextArea name="content" placeholder="피드백을 남겨주세요" />
        <button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid}
        >
          <Svg name="arrowDown" className={styles.arrowDownIcon} />
        </button>
      </form>
    </FormProvider>
  );
}
