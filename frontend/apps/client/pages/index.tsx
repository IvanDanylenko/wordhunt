import { Layout, HomeTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../utils/withTranslations';

export default function Index() {
  return (
    <Layout>
      <HomeTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();
