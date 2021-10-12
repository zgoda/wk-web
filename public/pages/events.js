import { useState, useEffect } from 'preact/hooks';

import { fetchEvents } from '../utils/api';
import { EventsTable } from '../components/presentation';
import text from './events.json';
import styles from './events.module.css';
import { useStoreon } from '../utils/state';

function CreateButton() {
  const { currentUser } = useStoreon('currentUser');

  if (currentUser != null) {
    return <button class={styles.createButton}>{text.createButton.text}</button>;
  }

  return <p class={styles.loginReminder}>Zaloguj się aby dodać wymarsz.</p>;
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
          <CreateButton />
        </div>
      </div>
      <EventsTable items={events} />
    </section>
  );
}
