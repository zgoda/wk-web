import { useState, useEffect } from 'preact/hooks';

import { fetchEvents } from '../utils/api';
import { EventsTable } from '../components/presentation';
import { useStore } from '@nanostores/preact';
import { sessionStore } from '../state';

import { Routes } from '../routes';
import styles from './events.module.css';
import text from './events.json';

function CreateLink() {
  const session = useStore(sessionStore);

  if (session.currentUser != null) {
    return (
      <p>
        <a href={Routes.CREATEEVENT}>{text.createButton.text}</a>
      </p>
    );
  }
  return <p class={styles.loginReminder}>{text.whenAnon.loginToAdd.text}</p>;
}

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function updateEvents() {
      const events = await fetchEvents();
      setEvents([...events]);
    }
    updateEvents();
  }, []);

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
