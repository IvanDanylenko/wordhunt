import { Layout, LoginTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../utils/withTranslations';

export default function Login() {
  return (
    <Layout>
      <LoginTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();
