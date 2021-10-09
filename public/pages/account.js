import { useEffect, useState } from 'preact/hooks';

import { Alert } from '../components/alert';
import { useStoreon } from '../utils/state';
import { updateUser } from '../utils/user';
import styles from './account.module.css';

export default function Account() {
  const { dispatch, currentUser, csrfAccessToken } = useStoreon(
    'currentUser',
    'csrfAccessToken',
  );
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => setName(currentUser.name), [currentUser]);

  const handleSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    currentUser.name = name;
    const rv = await updateUser(currentUser, csrfAccessToken);
    if (rv.status) {
      dispatch('user/set', rv.user);
      setShowSuccess(true);
    }
  };

  return (
    <section>
      {showSuccess && <Alert style="success" text="Dane użytkownika zapisane" />}
      <header>
        <hgroup>
          <h1>Konto użytkownika {currentUser.email}</h1>
          <h2>Tutaj możesz zmienić swoje dane</h2>
        </hgroup>
      </header>
      <div class={styles.formBody}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Wyświetlana nazwa użytkownika
            <input
              type="text"
              value={name}
              // @ts-ignore
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input type="text" value={currentUser.email} disabled />
          </label>
          <small>
            Adres email jest używany jako identyfikator użytkownika i nie może być
            zmieniony.
          </small>
          <button type="submit">Zapisz</button>
        </form>
      </div>
    </section>
  );
}
