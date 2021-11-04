import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';

import { Routes } from '../routes';
import { logout } from '../utils/auth';
import { NotificationStyle, useNotifications } from '../utils/notifications';
import text from './logout.json';

export default function Logout() {
  const { addNotification } = useNotifications();

  const loc = useLocation();

  useEffect(() => {
    logout();
    const flash = {
      style: NotificationStyle.SUCCESS,
      text: text.subtitle,
    };
    addNotification(flash);
    loc.route(Routes.HOME);
  }, [addNotification, loc]);

  return (
    <section>
      <hgroup>
        <h1>{text.title}</h1>
        <h2>{text.subtitle}</h2>
      </hgroup>
    </section>
  );
}
