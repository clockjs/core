import { describe, it, expect } from 'vitest'
import { calculateAngles, getHoursToDisplay, romanNumerals } from '../src/calculations'

describe('calculations', () => {
  it('should calculate angles correctly', () => {
    const angles = calculateAngles(12, 30, 45, 500)
    expect(angles.hour).toBeCloseTo(15.38, 1) // (0 + 0.5 + 45.5/3600) * 30
    expect(angles.minute).toBeCloseTo(184.55, 1) // (30 + 45.5/60) * 6
    expect(angles.second).toBe(273) // 45.5 * 6
  })

  it('should get hours to display', () => {
    expect(getHoursToDisplay(false)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    expect(getHoursToDisplay(true)).toEqual([3, 6, 9, 12])
  })

  it('should have roman numerals', () => {
    expect(romanNumerals).toEqual(['I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'])
  })
})