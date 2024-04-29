import { us } from './us'
import { vs } from './vs'

const data = [
  {
    header: { // u风向由西到冬
      parameterUnit: 'm.s - 1',
      parameterNumber: 2,
      dx: 0.6888,
      dy: 0.5242,
      lo1: 73, // 西北角
      la1: 62, // 西北角
      parameterCategory: 2,
      nx: 90,
      ny: 103
    },
    data: us
  },
  {
    header: { // v风向由北向南
      parameterUnit: 'm.s - 1',
      parameterNumber: 3,
      dx: 0.6888,
      dy: 0.5242,
      lo1: 73,
      la1: 62,
      parameterCategory: 2, // 固定值
      nx: 90,
      ny: 103
    },
    data: vs
  }
]

export { data }
