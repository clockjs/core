# @clockjs/core

A framework-agnostic core library for clock functionality, providing time management, animations, and calculations for building clock components.

## Installation

```bash
npm install @clockjs/core
```

## Usage

```typescript
import { Clock } from "@clockjs/core";

const clock = new Clock({ timezone: "America/New_York" });

// For smooth sweep
function animate() {
  clock.updateSweep();
  const state = clock.getState();
  // Use state to render
  requestAnimationFrame(animate);
}

// For tick animation
function animate() {
  clock.updateTick();
  const state = clock.getState();
  // Use state to render
  requestAnimationFrame(animate);
}
```

## License

MIT © [Robert Latamaosadi](https://github.com/latamaosadi)
