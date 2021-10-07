import { useEffect, useState } from 'preact/hooks';
import { useStoreon } from '../utils/state';
import styles from './account.module.css';

export default function Account() {
  const { currentUser } = useStoreon('currentUser');
  const [name, setName] = useState('');

  useEffect(() => setName(currentUser.name), [currentUser]);

  return (
    <section>
      <header>
        <hgroup>
          <h1>Konto użytkownika {currentUser.name}</h1>
          <h2>Tutaj możesz zmienić swoje dane</h2>
        </hgroup>
      </header>
      <div class={styles.formBody}>
        <form>
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
          <button type="submit">Zapisz</button>
        </form>
      </div>
    </section>
  );
}
