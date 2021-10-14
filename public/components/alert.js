import { useNotifications } from '../utils/notifications';

function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      {notifications.map((item) => (
        <div class={`alert-${item.style}`} key={`notif-${item.id}`}>
          <span class="closebtn" onClick={() => removeNotification(item.id)}>
            &times;
          </span>
          {item.text}
        </div>
      ))}
    </>
  );
}

export { Notifications };
