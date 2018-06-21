import JALALI from 'jalaali-js'

const localeObject = {
  name: 'fa',
  weekdays: 'یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه'.split('_'),
  weekdaysShort: 'یک‌_دو_سه‌_چه_پن_جم_شن'.split('_'),
  weekdaysMin: 'ی‌_د_س‌_چ_پ_ج_ش'.split('_'),
  months: 'فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند'.split('_'),
  monthsShort: 'فرو_ارد_خرد_تیر_مرد_شهر_مهر_آبا_آذر_دی_بهم_اسف'.split('_'),
  oridinal: n => `${n}ام`,
  relativeTime: {
    future: 'در %s',
    past: '%s قبل',
    s: 'چند ثانیه',
    m: 'یک دقیقه',
    mm: '%d دقیقه',
    h: 'یک ساعت',
    hh: '%d ساعت',
    d: 'یک روز',
    dd: '%d روز',
    M: 'یک ماه',
    MM: '%d ماه',
    y: 'یک سال',
    yy: '%d سال'
  }
}

const REGEX_PARSE = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])(\D?([01]\d|2[0-3])\D?([0-5]\d)\D?([0-5]\d)?\D?(\d{3})?([zZ]|([+-])([01]\d|2[0-3])\D?([0-5]\d)?)?)?$/
const REGEX_FORMAT = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g

export default (options, dayjsClass, dayjsFactory) => {
  dayjsFactory.locale(localeObject, null, true)
  const classProto = dayjsClass.prototype

  const oldFormat = classProto.format
  const oldParse = classProto.parse

  classProto.parse = function (cfg) {
    cfg.date = cfg.date || undefined
    const { date, jalali } = cfg
    if (jalali) {
      if ((typeof date === 'string') && (/.*$/i.test(date))) {
        const reg = date.match(REGEX_PARSE)
        if (reg) {
          const utils = this.$utils()
          const [, year, month, day, time] = reg
          const { gy, gm, gd } = JALALI.toGregorian(Number(year), Number(month), Number(day))
          cfg.date = `${gy}-${utils.padStart(gm, 2, '0')}-${utils.padStart(gd, 2, '0')}${time || ''}`
        }
      }
    }

    return oldParse.bind(this)(cfg)
  }

  classProto.format = function (formatStr) {
    const locale = this.$locale()
    const utils = this.$utils()

    if (locale.name === 'fa') {
      const str = formatStr || 'YYYY-MM-DDTHH:mm:ssZ'
      const { jy: year, jm: month, jd: day } = JALALI.toJalaali(this.$y, this.$M + 1, this.$D)
      const getShort = (arr, index, full, length) => (
        (arr && arr[index]) || full[index].substr(0, length)
      )

      formatStr = str.replace(REGEX_FORMAT, (match) => {
        switch (match) {
          case 'YY':
            return String(year).slice(-2)
          case 'YYYY':
            return String(year)
          case 'M':
            return String(month)
          case 'MM':
            return utils.padStart(month, 2, '0')
          case 'MMM':
            return getShort(locale.monthsShort, month - 1, locale.months, 3)
          case 'MMMM':
            return locale.months[month - 1]
          case 'D':
            return String(day)
          case 'DD':
            return utils.padStart(day, 2, '0')
          default:
            return match
        }
      })
    }

    return oldFormat.bind(this)(formatStr)
  }
}
