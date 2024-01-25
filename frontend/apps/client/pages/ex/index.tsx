import { Layout, ExercisesTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../../utils/withTranslations';

export default function Index() {
  return (
    <Layout>
      <ExercisesTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();
