// Clock face constants
export const HOURS_IN_CLOCK = 12;
export const MINUTES_IN_CLOCK = 60;

// Constants for angle calculations
export const DEGREES_PER_HOUR = 360 / 12; // 30 degrees
export const DEGREES_PER_MINUTE = 360 / 60; // 6 degrees
export const DEGREES_PER_SECOND = 360 / 60; // 6 degrees

// When `cardinalOnly` is true we only show every CARDINAL_STEP hour (3, 6, 9, 12)
export const CARDINAL_STEP = 3;

// When `cardinalOnly` is true we only show every CARDINAL_STEP hour (3, 6, 9, 12)
export const MAJOR_TICK_STEP = 5;

// Roman numerals for clock hours (note: IIII is traditionally used instead of IV on clock faces)
export const romanNumerals = [
  "I",
  "II",
  "III",
  "IIII",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

// Generate arrays for clock face elements
export const listHours = Array.from(
  { length: HOURS_IN_CLOCK },
  (_, index) => index + 1
);
export const listTicks = Array.from(
  { length: MINUTES_IN_CLOCK },
  (_, index) => index
);

export function getHoursToDisplay(cardinalOnly: boolean): number[] {
  return cardinalOnly
    ? listHours.filter((hour) => hour % CARDINAL_STEP === 0)
    : listHours.slice();
}

export function getTicksToDisplay(majorOnly: boolean): number[] {
  return majorOnly
    ? listTicks.filter((tickIndex) => tickIndex % MAJOR_TICK_STEP === 0)
    : listTicks.slice();
}

export function calculateAngles(
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds?: number
): { hour: number; minute: number; second: number } {
  // Calculate precise second position including milliseconds
  const secondFraction = milliseconds ? seconds + milliseconds / 1000 : seconds;
  const realSeconds = secondFraction % 60;

  // Calculate angles for each hand
  const hourAngle =
    ((hours % HOURS_IN_CLOCK) + // Hours (0-11)
      minutes / MINUTES_IN_CLOCK + // Minutes contribution
      realSeconds / (MINUTES_IN_CLOCK * 60)) * // Seconds contribution
    DEGREES_PER_HOUR;

  const minuteAngle =
    (minutes + // Minutes
      realSeconds / 60) * // Seconds contribution
    DEGREES_PER_MINUTE;

  const secondAngle = secondFraction * DEGREES_PER_SECOND;

  return { hour: hourAngle, minute: minuteAngle, second: secondAngle };
}

export function calculateShadow(
  angle: number,
  width: number,
  distance = 4
): string {
  // Constants for shadow calculation
  const LIGHT_ANGLE = 135; // Light source angle (in degrees)
  const BASE_CLOCK_SIZE = 500; // Reference size for scaling
  const BLUR_RATIO = 180; // Blur scaling factor
  const SHADOW_OPACITY = 0.5;

  // Convert angle to radians, adjusting for light source position
  const angleInRadians = ((angle + LIGHT_ANGLE) * Math.PI) / 180;

  // Scale distance based on current clock size
  const scaledDistance = width * (distance / BASE_CLOCK_SIZE);

  // Calculate shadow offset
  const shadowX = -Math.sin(angleInRadians) * scaledDistance;
  const shadowY = -Math.cos(angleInRadians) * scaledDistance;

  // Calculate blur radius
  const blurRadius = (width / BLUR_RATIO) * (distance / 8);

  return `drop-shadow(${shadowX}px ${shadowY}px ${blurRadius}px rgba(0,0,0,${SHADOW_OPACITY}))`;
}
