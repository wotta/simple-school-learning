const Str = (str) => {
  return {
    explode: (delimiter) => {
      return str.split(delimiter)
    },

    after: (key) => {
      let location = str.indexOf(key)
      return str.valueOf().substring(location + key.length)
    },

    trim: () => {
      return str.trim()
    },

    replace: (search, replace) => {
      return str.replace(search, replace)
    },

    toLowerCase: () => {
      return str.toLowerCase()
    },

    toUpperCase: () => {
      return str.toUpperCase()
    },

    length: () => {
      return str.length
    },

    isEmpty: () => {
      return str.length === 0
    },

    isNotEmpty: () => {
      return str.length > 0
    },

    removeLast: (n) => {
      return str.substring(0, str.length - n)
    },

    endsWith: (suffix) => {
      return str.indexOf(suffix, str.length - suffix.length) !== -1
    },

    append: (suffix) => {
      return Str(str + suffix)
    },

    when: (condition, callback, defaultReturn = null) => {
      if (condition) {
        str = callback instanceof Function ? callback(str) : str

        return Str(str)
      } else if (defaultReturn) {
        str = defaultReturn instanceof Function ? defaultReturn(str) : str

        return Str(str)
      }

      return Str(str)
    },

    unless: (condition, callback, defaultReturn = null) => {
      if (!condition) {
        str = callback instanceof Function ? callback(str) : str

        return Str(str)
      } else if (defaultReturn) {
        str = defaultReturn instanceof Function ? defaultReturn(str) : str

        return Str(str)
      }

      return Str(str)
    },

    value: () => {
      return str
    },
  }
}

export default Str
