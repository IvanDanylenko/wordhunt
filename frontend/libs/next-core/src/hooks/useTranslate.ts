import { useCallback } from 'react';
import { useI18n, RosettaExtended } from 'next-rosetta';
import { Translations } from '../i18n';

export const useTranslate = () => {
  const { t: translate, ...rest } = useI18n<Translations>();
  const t = useCallback<RosettaExtended<Translations>['t']>(
    (key: string, params?: Record<string, unknown>, lang?: string) => {
      return translate(key, params, lang) || key;
    },
    [translate],
  );

  return {
    t,
    ...rest,
  };
};
