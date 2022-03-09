const translations = {}
importAll(require.context("../translations", false, /^.*$/))

export function __(key, defaultValue, lang = "en") {
  let translation = translations.hasOwnProperty(lang)
    ? translations[lang].default
    : translations["en"].default

  if (translation.hasOwnProperty(key)) {
    return translation[key]
  }

  return defaultValue
}

function importAll(r) {
  r.keys().forEach(function (key) {
    translations[key.replace("./", "")] = r(key)
  })
}
