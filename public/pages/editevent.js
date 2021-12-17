import { useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { useTitle } from 'hoofd/preact';

import { fetchEvent } from '../utils/api';
import { Loading } from '../components/loading';
import { EditMode, EventForm } from '../components/forms';
import { sessionStore } from '../state/stores';
import { AuthenticationRequired } from '../components/auth';

/**
 * @typedef {Object} EditEventProps
 * @property {Object} params
 * @property {number} params.id
 *
 * @param {EditEventProps} props
 * @returns {JSX.Element}
 */
export default function EditEvent({ params }) {
  useTitle('Edycja danych wydarzenia');
  /**
   * @type [import('../..').EventData, import('preact/hooks').StateUpdater<import('../..').EventData>]
   */
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const session = useStore(sessionStore);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      const rv = await fetchEvent(params.id);
      setEvent(rv);
      setIsLoading(false);
    };
    fetchEventData();
  }, [params.id]);

  if (session.currentUser == null) {
    return <AuthenticationRequired />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <hgroup>
        <h1>Zmiana danych wymarszu</h1>
        <h2>{event.name}</h2>
      </hgroup>
      <EventForm editMode={EditMode.EDIT} event={event} />
    </section>
  );
}
