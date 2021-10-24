import { useEffect, useState } from 'preact/hooks';
import { useNotifications } from '../utils/notifications';

import style from './alert.module.scss';

function Notification({ notification }) {
  const [notificationStyle, setNotificationStyle] = useState('');
  const { removeNotification } = useNotifications();

  useEffect(() => {
    switch (notification.style) {
      case 'danger':
        setNotificationStyle(style.alertDanger);
        break;
      case 'warning':
        setNotificationStyle(style.alertWarning);
        break;
      default:
        setNotificationStyle(style.alertSuccess);
        break;
    }
    const timeout = setTimeout(() => removeNotification(notification.id), 4000);
    return () => clearTimeout(timeout);
  }, [notification, removeNotification]);

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
