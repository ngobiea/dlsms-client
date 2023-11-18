const hr = 3600;
const min = 60;
const uni = 10;
export const recordTime = (seconds) => {
  const hours = Math.floor(seconds / hr);
  const minutes = Math.floor((seconds % hr) / min);
  const remainingSeconds = seconds % min;

  return [hours, minutes, remainingSeconds]
    .map((unit) => (unit < uni ? `0${unit}` : `${unit}`))
    .join(':');
};
