import { useStore } from '@nanostores/preact';
import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';
import { useTitle } from 'hoofd/preact';

import { Routes } from '../routes';
import { clearUser } from '../state/actions';
import { tokenStore } from '../state/stores';
import { logout } from '../utils/auth';
import { NotificationStyle, useNotifications } from '../utils/notifications';
import text from './logout.json';

export default function Logout() {
  useTitle('Wylogowanie użytkownika z serwisu');
  const { addNotification } = useNotifications();

  const loc = useLocation();

  const tokens = useStore(tokenStore);

  useEffect(() => {
    async function doLogout() {
      const rv = await logout(tokens.csrfRefreshToken);
      if (rv.ok) {
        clearUser();
        addNotification({
          style: NotificationStyle.SUCCESS,
          text: text.subtitle,
        });
      } else {
        addNotification({
          style: NotificationStyle.ERROR,
          text: `Nie udało się wylogować użytkownika, błąd: ${rv.error}`,
        });
      }
    }
    doLogout();
    loc.route(Routes.HOME);
  }, [addNotification, loc, tokens]);

  return (
    <section>
      <hgroup>
        <h1>{text.title}</h1>
        <h2>{text.subtitle}</h2>
      </hgroup>
    </section>
  );
}
