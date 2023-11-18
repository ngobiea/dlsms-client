let startTime = 0;

let running = false;
const hr = 3600;
const min = 60;
const uni = 10;
const oneSecond = 1000;
export const recordTime = (seconds) => {
  const hours = Math.floor(seconds / hr);
  const minutes = Math.floor((seconds % hr) / min);
  const remainingSeconds = seconds % min;

  return [hours, minutes, remainingSeconds]
    .map((unit) => (unit < uni ? `0${unit}` : `${unit}`))
    .join(':');
};

/**
 * Starts a stopwatch if one hasn't already been started
 */
export const start = () => {
  if (!running) {
    startTime = Date.now() - (startTime > 0 ? startTime : 0);
    running = true;
  }
};

/**
 * Stops the current stopwatch
 */
export const stop = () => {
  if (running) {
    startTime = 0;
    running = false;
  }
};

/**
 * Gets either the current time the stopwatch has been running for or how long it ran for
 * @returns {number} the time in seconds
 */
export const getTime = () => {
  if (running) {
    return Math.floor((Date.now() - startTime) / oneSecond);
  } else {
    return Math.floor(startTime / oneSecond);
  }
};

/**
 * Resets the stopwatch
 */

export const reset = () => {
  startTime = null;
  running = false;
};
