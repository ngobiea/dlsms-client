export const postScheduleClassSessionQuery = (schedule) => {
  return {
    url: '/tutor/classroom/schedule',
    method: 'POST',
    body: schedule,
  };
};
