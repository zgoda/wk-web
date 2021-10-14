import { useEffect, useState } from 'preact/hooks';

import { Alert } from '../components/alert';
import { useStoreon } from '../utils/state';
import { updateUser } from '../utils/user';
import text from './account.json';

export default function Account() {
  const { dispatch, currentUser, csrfAccessToken, csrfRefreshToken, flashMessages } =
    useStoreon('currentUser', 'csrfAccessToken', 'csrfRefreshToken', 'flashMessages');
  const [name, setName] = useState('');
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => setName(currentUser.name), [currentUser]);

  useEffect(() => setShowFlash(flashMessages.length > 0), [flashMessages]);

  const handleSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    currentUser.name = name;
    const rv = await updateUser(currentUser, csrfAccessToken, csrfRefreshToken);
    if (rv.status) {
      dispatch('user/set', rv.user);
      if (rv.csrfAccessToken != null) {
        dispatch('csrfaccesstoken/set', rv.csrfAccessToken);
      }
      if (rv.csrfRefreshToken != null) {
        dispatch('csrfrefreshtoken/set', rv.csrfRefreshToken);
      }
      const message = {
        style: 'success',
        text: text.alert.success.text,
      };
      dispatch('flash/add', message);
    }
  };

  return (
    <section>
      {showFlash && <Alert style="success" text={text.alert.success.text} />}
      <header>
        <hgroup>
          <h1>
            {text.title} {currentUser.email}
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
            <input type="text" value={currentUser.email} disabled />
          </label>
          <small>{text.form.email.description}</small>
          <button type="submit">{text.form.submit.text}</button>
        </form>
      </div>
    </section>
  );
}
