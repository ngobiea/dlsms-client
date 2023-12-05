export const notification = (title, body) => {
  const notification = new window.Notification(title, {
    body,
  });
  notification.onclick = () => {
    console.log('notification clicked');
  };
};
