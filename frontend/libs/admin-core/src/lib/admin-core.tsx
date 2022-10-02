import styles from './admin-core.module.css';

/* eslint-disable-next-line */
export interface AdminCoreProps {}

export function AdminCore(props: AdminCoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminCore!</h1>
    </div>
  );
}

export default AdminCore;
