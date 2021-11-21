import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';

import { setAccessToken, setCurrentUser, setRefreshToken } from '../state/actions';
import { sessionStore, tokenStore } from '../state/stores';
import { NotificationStyle, useNotifications } from '../utils/notifications';
import { updateUser } from '../utils/user';

import text from './account.json';

export default function Account() {
  const session = useStore(sessionStore);
  const tokens = useStore(tokenStore);
  const [name, setName] = useState('');

  const { addNotification } = useNotifications();

  useEffect(() => setName(session.currentUser.name), [session.currentUser]);

  const handleSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    const user = { ...session.currentUser };
    user.name = name;
    const rv = await updateUser(user, tokens.csrfAccessToken, tokens.csrfRefreshToken);
    if (rv.status) {
      setCurrentUser(rv.user);
      if (rv.csrfAccessToken != null) {
        setAccessToken(rv.csrfAccessToken);
      }
      if (rv.csrfRefreshToken != null) {
        setRefreshToken(rv.csrfRefreshToken);
      }
      addNotification({
        style: NotificationStyle.SUCCESS,
        text: text.alert.success.text,
      });
    }
  };

  return (
    <section>
      <header>
        <hgroup>
          <h1>
            {text.title} {session.currentUser.email}
          </h1>
          <h2>{text.subtitle}</h2>
        </hgroup>
      </header>
      <div class="formBody">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            {text.form.name.label}
            <input
              type="text"
              value={name}
              // @ts-ignore
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            {text.form.email.label}
            <input type="text" value={session.currentUser.email} disabled />
          </label>
          <small>{text.form.email.description}</small>
          <button type="submit">{text.form.submit.text}</button>
        </form>
      </div>
    </section>
  );
}
