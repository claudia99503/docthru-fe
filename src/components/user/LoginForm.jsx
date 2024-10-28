import { FormProvider, useForm } from 'react-hook-form';
import styles from './userForms.module.css';
import Input from '../common/form/Input';
import { AUTH } from '@/variables/formValidation';
import PasswordInput from '../common/form/PasswordInput';
import { useAuth } from '@/hooks/useAuth';
import Loader from '../common/Loader';
import Link from 'next/link';

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
    return <Loader msg="로그인 중" />;
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
      <p className={styles.text}>
        회원이 아니신가요?
        <Link href="/auth/sign-up" className={styles.link}>
          회원가입하기
        </Link>
      </p>
    </>
  );
}
