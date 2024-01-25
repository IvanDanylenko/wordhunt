import { Layout, RegisterTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../utils/withTranslations';

export default function Register() {
  return (
    <Layout>
      <RegisterTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();
