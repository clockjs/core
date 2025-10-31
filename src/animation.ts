export function easeOutBack(progress: number): number {
  const overshootAmount = 1.70158;
  const cubicMagnitude = overshootAmount + 1;
  return (
    1 +
    cubicMagnitude * Math.pow(progress - 1, 3) +
    overshootAmount * Math.pow(progress - 1, 2)
  );
}

// Constants for tick animation
const DEGREES_PER_SECOND = 6; // 360° / 60 seconds
const ANIMATION_DURATION = 600; // Animation duration in milliseconds
const SECONDS_IN_MINUTE = 60;

export interface TickAnimationState {
  lastSecond: number;
  startAngle: number;
  targetAngle: number;
  animationStart: number;
}

export function updateTickAnimation(
  currentSeconds: number,
  targetSecond: number,
  animationState: TickAnimationState
): number {
  // Initialize animation when second changes
  if (targetSecond !== animationState.lastSecond) {
    animationState.lastSecond = targetSecond;
    animationState.startAngle =
      (currentSeconds % SECONDS_IN_MINUTE) * DEGREES_PER_SECOND;
    animationState.targetAngle =
      (targetSecond || SECONDS_IN_MINUTE) * DEGREES_PER_SECOND;
    animationState.animationStart = performance.now();
  }

  // Calculate animation progress
  const elapsed = performance.now() - animationState.animationStart;
  const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
  const eased = easeOutBack(progress);

  // Calculate interpolated position with easing
  const interpolatedAngle =
    animationState.startAngle +
    (animationState.targetAngle - animationState.startAngle) * eased;

  // Return the new seconds value
  return (interpolatedAngle / DEGREES_PER_SECOND) % SECONDS_IN_MINUTE;
}
