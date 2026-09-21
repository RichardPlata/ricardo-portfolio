import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../locales/en/common.json'
import esCommon from '../locales/es/common.json'
import enProjects from '../locales/en/projects.json'
import esProjects from '../locales/es/projects.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon, projects: enProjects },
    es: { common: esCommon, projects: esProjects },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
  defaultNS: 'common',
  ns: ['common', 'projects'],
  interpolation: { escapeValue: false },
  initAsync: false,
})

export default i18n
