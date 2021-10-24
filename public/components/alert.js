import { useEffect } from 'preact/hooks';
import { useNotifications } from '../utils/notifications';

import style from './alert.module.scss';

function Notification({ notification }) {
  const { removeNotification } = useNotifications();

  useEffect(() => {
    const timeout = setTimeout(() => removeNotification(notification.id), 4000);
    return () => clearTimeout(timeout);
  }, [notification, removeNotification]);

  let notificationStyle;
  switch (notification.style) {
    case 'danger':
      notificationStyle = style.alertDanger;
      break;
    case 'warning':
      notificationStyle = style.alertWarning;
      break;
    default:
      notificationStyle = style.alertSuccess;
      break;
  }

  return (
    <div class={notificationStyle}>
      <span class={style.closebtn} onClick={() => removeNotification(notification.id)}>
        &times;
      </span>
      {notification.text}
    </div>
  );
}

function Notifications() {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications.map((item) => (
        <Notification notification={item} key={`notif-${item.id}`} />
      ))}
    </>
  );
}

export { Notifications };
