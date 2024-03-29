import { useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { useTitle } from 'hoofd/preact';

import { Loading } from '../components/loading';
import { fetchEvent } from '../utils/api';
import { sessionStore } from '../state/stores';
import { isActiveOwner } from '../utils/user';
import { Routes } from '../routes';
import { ErrorState } from '../components/errorstate';

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
 * @typedef {object} OwnerToolsRowProps
 * @property {import('../..').EventData} event
 *
 * @param {OwnerToolsRowProps} props
 * @returns {JSX.Element | null}
 */
function OwnerToolsRow({ event }) {
  const session = useStore(sessionStore);
  if (isActiveOwner(event, session.currentUser))
    return (
      <article>
        <a role="button" href={`${Routes.EDITEVENT_BARE}/${event.eventId}`}>
          {text.editButton.text}
        </a>
      </article>
    );
  return null;
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
  useTitle('Dane wydarzenia');
  /**
   * @type [import('../..').EventData, import('preact/hooks').StateUpdater<import('../..').EventData>]
   */
  const [event, setEvent] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      const rv = await fetchEvent(params.id);
      if (rv == null) {
        setHasError(true);
      } else {
        setEvent(rv);
      }
      setIsLoading(false);
    };
    fetchEventData();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <ErrorState />;
  }

  return (
    <section>
      <header>
        <hgroup>
          <h1>{event.name}</h1>
          <h2>
            Wymarsz odbędzie się {event.date.toLocaleDateString()}
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
      <OwnerToolsRow event={event} />
    </section>
  );
}
