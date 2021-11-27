import { useEffect, useState } from 'preact/hooks';

import { Loading } from '../components/loading';
import { fetchEvent } from '../utils/api';

import styles from './event.module.css';
import text from './event.json';

/**
 * @typedef {object} DisplayRowProps
 * @property {string} label
 * @property {string} value
 *
 * @param {DisplayRowProps} props
 * @returns {JSX.Element}
 */
function DisplayRow({ label, value }) {
  return (
    <div class={styles.row}>
      <div class={styles.left}>
        <p>{label}</p>
      </div>
      <div class={styles.right}>
        <p>{value}</p>
      </div>
    </div>
  );
}

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
            {event.virtual && `, ${text.virtual}`}
            {event.public && `, ${text.public}`}
          </h2>
        </hgroup>
      </header>
      <DisplayRow label={text.created} value={event.created.toLocaleString()} />
      <DisplayRow label={text.author} value={event.user.name} />
      <DisplayRow label={text.length} value={event.length.toString()} />
      <DisplayRow label={text.location} value={event.location} />
      {event.description && <p>{event.description}</p>}
    </section>
  );
}
