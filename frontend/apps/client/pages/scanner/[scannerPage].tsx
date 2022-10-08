import { GetStaticPaths } from 'next';
import { Layout, ScannerTemplate } from '@wordhunt/next-core';
import { withTranslations } from '../../utils/withTranslations';

export default function ScannerPage() {
  return (
    <Layout>
      <ScannerTemplate />
    </Layout>
  );
}

export const getStaticProps = withTranslations();

const tabs = ['list', 'known', 'unknown', 'clear'];

export const getStaticPaths: GetStaticPaths = () => {
  const paths = tabs.map((value) => {
    return { params: { scannerPage: value } };
  });
  return {
    paths,
    fallback: false,
  };
};
