import { GetStaticProps } from 'next';
import { getTranslations } from './getTranslations';

export const withTranslations = () => {
  return async (context: GetStaticProps) => {
    return {
      props: {
        translations: await getTranslations(),
      },
    };
  };
};
