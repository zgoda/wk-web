import { nanoid } from 'nanoid/non-secure';
import { createContext } from 'preact';
import { useCallback, useContext, useState } from 'preact/hooks';

const notificationDefaults = {
  /** @type {Array<import('../..').Notification>} */
  notifications: [],
  // eslint-disable-next-line no-unused-vars
  addNotification: (/** @type {import('../..').Notification} */ notification) => null,
  // eslint-disable-next-line no-unused-vars
  removeNotification: (/** @type {string} */ id) => null,
};

export const NotificationsContext = createContext(notificationDefaults);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(
    notificationDefaults.notifications,
  );

  const addNotification = useCallback(
    (/** @type {import('../..').Notification} */ notification) => {
      const nextNotifications = notifications.concat({ id: nanoid(), ...notification });
      setNotifications(nextNotifications);
    },
    [notifications, setNotifications],
  );

  const removeNotification = useCallback(
    (/** @type {string} */ id) => {
      const nextNotifications = notifications.filter((n) => n.id !== id);
      setNotifications(nextNotifications);
    },
    [notifications, setNotifications],
  );

  const api = { notifications, addNotification, removeNotification };

  return (
    <NotificationsContext.Provider value={api}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
