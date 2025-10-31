import { getTime } from "./src/time";
import { updateTickAnimation } from "./src/animation";
import type { TickAnimationState } from "./src/animation";
import { calculateAngles, calculateShadow } from "./src/calculations";
import type {
  TimeState,
  ClockAngles,
  ClockShadows,
  ClockOptions,
} from "./src/types";

export * from "./src/types";
export * from "./src/calculations";

export class Clock {
  private options: ClockOptions;
  private state: TimeState;
  private tickAnimationState: TickAnimationState;
  private width: number;

  constructor(options: ClockOptions, width: number) {
    this.options = options;
    this.width = width;
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      currentDate: 0,
    };
    this.tickAnimationState = {
      lastSecond: -1,
      startAngle: 0,
      targetAngle: 0,
      animationStart: 0,
    };
  }

  updateSweep(): void {
    const time = getTime(this.options.timezone);
    this.state.currentDate = time.getDate();
    this.state.hours = time.getHours();
    this.state.minutes = time.getMinutes();
    this.state.seconds = time.getSeconds();
    const now = new Date();
    this.state.milliseconds = now.getMilliseconds() - 500;
  }

  updateTick(): void {
    const time = getTime(this.options.timezone);
    this.state.currentDate = time.getDate();

    const targetSecond = time.getSeconds();

    // Tick animation
    const interpolatedSeconds = updateTickAnimation(
      this.state.seconds,
      targetSecond,
      this.tickAnimationState
    );
    this.state.seconds = interpolatedSeconds;

    // Update hours and minutes at the start of each minute
    const isStartOfMinute = this.state.seconds >= 0 && this.state.seconds <= 1;
    if (isStartOfMinute) {
      this.state.minutes = time.getMinutes();
      this.state.hours = time.getHours();
    }
    this.state.milliseconds = 0;
  }

  getState(): TimeState {
    return { ...this.state };
  }

  getAngles(): ClockAngles {
    return calculateAngles(
      this.state.hours,
      this.state.minutes,
      this.state.seconds,
      this.state.milliseconds
    );
  }

  getShadows(): ClockShadows {
    const angles = this.getAngles();
    return {
      hour: calculateShadow(angles.hour, this.width),
      minute: calculateShadow(angles.minute, this.width),
      second: calculateShadow(angles.second, this.width, 8),
    };
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setOptions(options: Partial<ClockOptions>): void {
    this.options = { ...this.options, ...options };
  }
}
