import moment from 'moment';
const code8 = 8;
const pad = 2;
export const timeConstants = {
  oneMins: 1000,
  sixtySecs: 60,
  fifteenMins: 15,
  fiveMins: 5,
};
export const validDate = (current) => {
  const yesterday = moment().subtract(1, 'day');
  return current.isAfter(yesterday);
};
export const timeConstraints = {
  minutes: {
    step: 1,
  },
};
export const add15MinutesToEndTime = (initialStartTime) => {
  const startTime = initialStartTime;
  return new Date(
    startTime.getTime() +
      timeConstants.fifteenMins *
        timeConstants.sixtySecs *
        timeConstants.oneMins
  );
};
export const add5MinutesToStateTime = (initialStartTime) => {
  const startTime = new Date(initialStartTime);
  return new Date(
    startTime.getTime() +
      timeConstants.fiveMins * timeConstants.sixtySecs * timeConstants.oneMins
  );
};
export const calculateDateDifference = (startDate, endDate) => {
  if (startDate && endDate) {
    const timeDifferenceInMilliseconds = endDate - startDate;
    const totalMinutes =
      timeDifferenceInMilliseconds /
      (timeConstants.oneMins * timeConstants.sixtySecs);
    const hours = Math.floor(totalMinutes / timeConstants.sixtySecs);
    const minutes = Math.floor(totalMinutes % timeConstants.sixtySecs);

    if (hours > 0) {
      return `${hours}h${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }
  return '';
};

export const isValidTimeRange = (startTime, endTime) => {
  // Check if the difference between start and end time is greater than 0
  if (endTime <= startTime) {
    return false;
  }

  // Check if the start time is less than the current time
  const currentTime = new Date();
  if (startTime < currentTime) {
    return false;
  }

  // If both conditions are met, return true (valid time range)
  return true;
};

export const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
  }).format(dateTime);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(dateTime);

  return `${formattedDate} ${formattedTime}`;
};

export const formatCustomDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);

  const formattedDateTime = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(dateTime);

  return formattedDateTime;
};

