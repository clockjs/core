import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ClockWork, ClockFace } from '../index'

describe('ClockWork', () => {
  let clockWork: ClockWork

  beforeEach(() => {
    clockWork = new ClockWork({})
  })

  it('should initialize with default state', () => {
    const state = clockWork.getState()
    expect(state.hours).toBe(0)
    expect(state.minutes).toBe(0)
    expect(state.seconds).toBe(0)
    expect(state.milliseconds).toBe(0)
  })

  it('should update sweep correctly', () => {
    // Mock Date
    const mockDate = new Date(2023, 0, 1, 12, 30, 45, 123)
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

    clockWork.updateSweep()
    const state = clockWork.getState()

    expect(state.hours).toBe(12)
    expect(state.minutes).toBe(30)
    expect(state.seconds).toBe(45)
    expect(state.milliseconds).toBe(123 - 500)

    vi.useRealTimers()
  })

  it('should update tick correctly', () => {
    const mockDate = new Date(2023, 0, 1, 12, 30, 45, 123)
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)

    clockWork.updateTick()
    const state = clockWork.getState()

    expect(state.hours).toBe(12)
    expect(state.minutes).toBe(30)
    expect(state.seconds).toBeCloseTo(0) // Animation starts from 0
    expect(state.milliseconds).toBe(0)

    vi.useRealTimers()
  })

  it('should handle timezone', () => {
    const clockWithTimezone = new ClockWork({ timezone: 'UTC' })
    expect(clockWithTimezone).toBeDefined()
  })
})

describe('ClockFace', () => {
  it('should calculate angles correctly', () => {
    const state = { hours: 12, minutes: 30, seconds: 45, milliseconds: 500 }
    const face = new ClockFace(state, 500)
    const angles = face.getAngles()
    expect(angles.hour).toBeCloseTo(15.38, 1)
    expect(angles.minute).toBeCloseTo(184.55, 1)
    expect(angles.second).toBe(273)
  })

  it('should calculate shadows', () => {
    const state = { hours: 12, minutes: 30, seconds: 45, milliseconds: 500 }
    const face = new ClockFace(state, 500)
    const shadows = face.getShadows()
    expect(shadows.hour).toBeDefined()
    expect(shadows.minute).toBeDefined()
    expect(shadows.second).toBeDefined()
  })
})