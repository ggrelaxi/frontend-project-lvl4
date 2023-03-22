import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { ru } from './ru';

i18n.use(initReactI18next).init({
    resources: {
        ru: {
            translation: ru,
        },
    },
    lng: 'ru',
    fallbackLng: 'ru',
});

export default i18n;
