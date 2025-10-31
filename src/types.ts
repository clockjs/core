export interface ClockOptions {
  timezone?: string;
}

export interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface ClockAngles {
  hour: number;
  minute: number;
  second: number;
}

export interface ClockShadows {
  hour: string;
  minute: string;
  second: string;
}
