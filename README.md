# Day.js Jalali
> Jalali calendar plugin for day.js

## Installation

``` npm i dayjs-jalali ```

or 

``` yarn add dayjs-jalali ```

## How to use

``` javascript
import jalali from 'dayjs-jalali'

dayjs.extend(jalali)

dayjs().locale('fa').format() // 1397-04-01T16:30:00+04:30

dayjs('1397-04-01T16:30:00+04:30', { jalali: true }).format() //  2017-06-22T16:30:00+04:30

dayjs('1397-04-01T16:30:00+04:30', { jalali: true }).locale('fa').format() //  1397-04-01T16:30:00+04:30
```
