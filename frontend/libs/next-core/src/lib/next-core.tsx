import styles from './next-core.module.css';

/* eslint-disable-next-line */
export interface NextCoreProps {}

export function NextCore(props: NextCoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NextCore!</h1>
    </div>
  );
}

export default NextCore;
