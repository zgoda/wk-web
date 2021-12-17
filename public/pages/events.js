import { useState, useEffect } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { useTitle } from 'hoofd/preact';

import { fetchEvents } from '../utils/api';
import { EventsTable } from '../components/presentation';
import { sessionStore } from '../state/stores';
import { Loading } from '../components/loading';
import { Routes } from '../routes';
import styles from './events.module.css';
import text from './events.json';

function CreateLink() {
  const session = useStore(sessionStore);

  if (session.currentUser != null) {
    return (
      <p>
        <a href={Routes.CREATEEVENT} role="button">
          {text.createButton.text}
        </a>
      </p>
    );
  }
  return <p class={styles.loginReminder}>{text.whenAnon.loginToAdd.text}</p>;
}

export default function Events() {
  useTitle('Lista nadchodzących wydarzeń');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function updateEvents() {
      setIsLoading(true);
      const events = await fetchEvents();
      setEvents([...events]);
      setIsLoading(false);
    }
    updateEvents();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <header>
        <hgroup>
          <h1>{text.title}</h1>
          <h2>{text.subtitle}</h2>
        </hgroup>
      </header>
      <div class="grid">
        <div>
          {text.intro.map((line, index) => (
            <p key={`intro-l-${index}`}>{line}</p>
          ))}
        </div>
        <div class={styles.buttonWrapper}>
          <CreateLink />
        </div>
      </div>
      <EventsTable items={events} />
    </section>
  );
}
