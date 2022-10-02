import polyglotI18nProvider from 'ra-i18n-polyglot';
import { I18nProvider, TranslationMessages } from 'react-admin';

interface I18nProviderCreatorProps {
  messages: {
    en: TranslationMessages;
  };
}

type I18nProviderCreator = (props: I18nProviderCreatorProps) => I18nProvider;

export const i18nProviderCreator: I18nProviderCreator = ({ messages }) => {
  return polyglotI18nProvider((locale) => {
    // Always fallback on english
    return messages.en;
  }, 'en');
};
