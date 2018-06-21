import dayjs from 'dayjs'
import MockDate from 'mockdate'
import { DateTime } from 'luxon'
import jalali from '../src/index'

dayjs.extend(jalali)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Format Empty String', () => {
  expect(dayjs('', { jalali: true }).locale('fa').format()).toBe(DateTime.local().reconfigure({ outputCalendar: 'persian' }).toFormat('yyyy-MM-dd\'T\'HH:mm:ssZZ'))
})

it('Parse Jalali Date', () => {
  expect(dayjs('1397-04-01T12:00:00Z', { jalali: true }).locale('fa').format()).toBe(DateTime.fromISO('2018-06-22T12:00:00Z').reconfigure({ outputCalendar: 'persian' }).toFormat('yyyy-MM-dd\'T\'HH:mm:ssZZ'))
})
