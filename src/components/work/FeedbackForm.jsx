import { useForm, useFormContext } from 'react-hook-form';
import TextArea from '../common/form/TextArea';
import styles from './FeedbackForm.module.css';
import assets from '@/variables/images';
export default function FeedbackForm() {
  const {} = useForm();
  return (
    <form className={styles.FeedbackForm}>
      <TextArea placeholder="피드백을 남겨주세요" />
      <button>
        <Image src={assets.icons.arrowDown} />
      </button>
    </form>
  );
}
c;
