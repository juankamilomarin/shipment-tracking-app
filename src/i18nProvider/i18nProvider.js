import polyglotI18nProvider from 'ra-i18n-polyglot'

// interface translations
import englishMessages from 'ra-language-english'

// domain translations
import en from './i18n/en';

const messages = {
    en: { ...englishMessages, ...en },
};

const i18nProvider = polyglotI18nProvider(
    locale => messages[locale],
    'en', // Default locale
    { allowMissing: true } // Silence translation warnings
);

export default i18nProvider