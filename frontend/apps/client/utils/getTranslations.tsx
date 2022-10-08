export const getTranslations = (lang = 'en', namespace = 'common') => {
  return import(`../i18n/${namespace}_${lang}`).then((m) => m.default);
};
