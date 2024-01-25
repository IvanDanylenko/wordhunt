import { Layout, LentaTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../../utils/withTranslations';

export default function Biatlon() {
  return (
    <Layout>
      <LentaTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();
