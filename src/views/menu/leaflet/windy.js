import { us } from './us'
import { vs } from './vs'

const data = [
  {
    header: { // u风向由西到冬
      parameterUnit: 'm.s - 1',
      parameterNumber: 2,
      dx: 0.3442,
      dy: 0.2612,
      lo1: 73, // 右上角
      la1: 62, // 右上角
      parameterCategory: 2,
      nx: 180,
      ny: 206,
      refTime: '2022 - 03 - 02 12: 00: 00'
    },
    data: us
  },
  {
    header: { // v风向由北向南
      parameterUnit: 'm.s - 1',
      parameterNumber: 3,
      dx: 0.3442,
      dy: 0.2612,
      lo1: 73,
      la1: 62,
      parameterCategory: 2, // 固定值
      nx: 180,
      ny: 206,
      refTime: '2017 - 03 - 02 12: 00: 00' // 时间
    },
    data: vs
  }
]

export { data }
