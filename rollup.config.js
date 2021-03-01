import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    name: 'dayjs-jalali',
    file: 'dayjs-jalali.min.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      include: './src/**/*.js',
      exclude: 'node_modules/**'
    })
  ]
}
