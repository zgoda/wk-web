import { useEffect, useState } from 'preact/hooks';

import { Loading } from '../components/loading';
import { fetchEvent } from '../utils/api';

import styles from './event.module.css';

/**
 * @typedef {Object} EventProps
 * @property {Object} params
 * @property {number} params.id
 *
 * @param {EventProps} props
 * @returns {JSX.Element}
 */
export default function Event({ params }) {
  /**
   * @type [import('../..').EventData, import('preact/hooks').StateUpdater<import('../..').EventData>]
   */
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      const rv = await fetchEvent(params.id);
      setEvent(rv);
      setIsLoading(false);
    };
    fetchEventData();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <header>
        <hgroup>
          <h1>{event.name}</h1>
          <h2>
            Odbędzie się {event.date.toLocaleDateString()}
            {event.virtual && ', wirtualny'}
            {event.public && ', publiczny'}
          </h2>
        </hgroup>
      </header>
      <div class={styles.row}>
        <div class={styles.left}>
          <p>Utworzony</p>
        </div>
        <div class={styles.right}>
          <p>{event.created.toLocaleString()}</p>
        </div>
      </div>
      <div class={styles.row}>
        <div class={styles.left}>
          <p>Autor</p>
        </div>
        <div class={styles.right}>
          <p>{event.user.name}</p>
        </div>
      </div>
      <div class={styles.row}>
        <div class={styles.left}>
          <p>Długość</p>
        </div>
        <div class={styles.right}>
          <p>{`${event.length} km`}</p>
        </div>
      </div>
      <div class={styles.row}>
        <div class={styles.left}>
          <p>Gdzie</p>
        </div>
        <div class={styles.right}>
          <p>{event.location}</p>
        </div>
      </div>
      {event.description && <p>{event.description}</p>}
    </section>
  );
}
