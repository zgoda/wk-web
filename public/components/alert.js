import { useEffect } from 'preact/hooks';
import { useNotifications } from '../utils/notifications';

function Notification({ notification }) {
  const { removeNotification } = useNotifications();

  useEffect(() => {
    const timeout = setTimeout(() => removeNotification(notification.id), 4000);
    return () => clearTimeout(timeout);
  }, [notification, removeNotification]);

  return (
    <div class={`alert-${notification.style}`}>
      <span class="closebtn" onClick={() => removeNotification(notification.id)}>
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
