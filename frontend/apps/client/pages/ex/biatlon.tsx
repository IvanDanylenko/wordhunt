import { Layout, BiatlonTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../../utils/withTranslations';

export default function Biatlon() {
  return (
    <Layout>
      <BiatlonTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();
