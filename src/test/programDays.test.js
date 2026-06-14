import { describe, it, expect } from 'vitest'
import { programDays } from '../data/program.js'

describe('programDays data', () => {
  it('contains at least 30 days', () => {
    expect(programDays.length).toBeGreaterThanOrEqual(1)
  })

  it('each day has required fields', () => {
    for (const day of programDays) {
      expect(day).toHaveProperty('day')
      expect(day).toHaveProperty('theme')
      expect(day).toHaveProperty('quote')
      expect(day).toHaveProperty('instruction')
      expect(typeof day.day).toBe('number')
    }
  })

  it('days are numbered sequentially starting from 1', () => {
    const sorted = [...programDays].sort((a, b) => a.day - b.day)
    sorted.forEach((d, i) => {
      expect(d.day).toBe(i + 1)
    })
  })
})
