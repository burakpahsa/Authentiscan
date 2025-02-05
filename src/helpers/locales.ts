import i18next from "i18next";

export const getCurrentLanguage = () => {
    return i18next.language; // Returns "en", "de", etc.
  };

const europeanDateLocales: {[lang: string]: string} = {
    'de': 'de-DE',
    'en': 'en-GB'
}

const getLocaleString = (time: Date, locale: string, isDateTime?: boolean) => {
    if (isDateTime) {
        return time.toLocaleString(locale)
    }
    return time.toLocaleDateString(locale)
}

export const getLocalDateString = (date: string, isDateTime?: boolean) => {
    const time = new Date(date)
    const selectedLanguage = getCurrentLanguage();
    let locale;

    if (selectedLanguage === 'en' && navigator.languages.includes('en-US')) {
        locale = 'en-US'
    } else {
        locale = europeanDateLocales[selectedLanguage]
    }

    return getLocaleString(time, locale, isDateTime)
}
