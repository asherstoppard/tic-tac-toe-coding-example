import { randomIntFromRange } from './randomIntFromRange'

describe('utils › randomIntFromRange', () => {
  const tests = [
    [1, 25],
    [25, 50],
    [50, 75],
    [100, 250],
    [250, 500],
    [750, 1500]
  ]

  it('returns a number between the given range', async () => {
    await Promise.all(tests.map(([min, max]) => {
      const output = randomIntFromRange(min, max)
      return expect(output > min && output <= max).toBeTruthy()
    }))
  })
})
