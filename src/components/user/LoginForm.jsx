import { FormProvider, useForm } from 'react-hook-form';
import styles from './userForms.module.css';
import Input from '../common/form/Input';
import { AUTH } from '@/variables/formValidation';
import PasswordInput from '../common/form/PasswordInput';
import { useAuth } from '@/hooks/useAuth';
import Loader from '../common/Loader';

export default function LoginForm() {
  const formMethods = useForm();
  const { login, isLoading } = useAuth();

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = formMethods;

  const handleLoginSubmit = (data) => {
    login.mutate(data, {
      onSuccess: () => {
        console.log('로그인 됨');
        reset();
      },
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          className={styles.AuthForm}
          onSubmit={handleSubmit(handleLoginSubmit)}
        >
          <Input
            name="email"
            label="이메일"
            type="email"
            validations={AUTH.EMAIL}
          />
          <PasswordInput
            name="password"
            label="비밀번호"
            validations={AUTH.PASSWORD}
          />
          <button
            className={styles['submit-btn']}
            type="submit"
            disabled={!isValid}
          >
            로그인
          </button>
        </form>
      </FormProvider>
    </>
  );
}
