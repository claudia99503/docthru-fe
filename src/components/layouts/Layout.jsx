import { MemberHeader } from './Header';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <MemberHeader />
      <main className={styles.main}>{children}</main>
    </>
  );
}
