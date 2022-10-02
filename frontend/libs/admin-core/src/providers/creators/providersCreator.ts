import { i18nProviderCreator } from '.';
import { translationMessages } from '../../i18n';
import { authProviderCreator } from './authProviderCreator';
import { dataProviderCreator } from './dataProviderCreator';

export const providersCreator = () => {
  return {
    authProvider: authProviderCreator(),
    dataProvider: dataProviderCreator(),
    i18nProvider: i18nProviderCreator({ messages: translationMessages }),
  };
};
