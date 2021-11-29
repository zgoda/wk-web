import { useEffect, useState } from 'preact/hooks';

import { fetchEvent } from '../utils/api';
import { Loading } from '../components/loading';

/**
 * @typedef {Object} EditEventProps
 * @property {Object} params
 * @property {number} params.id
 *
 * @param {EditEventProps} props
 * @returns {JSX.Element}
 */
export default function EditEvent({ params }) {
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
      <hgroup>
        <h1>Zmiana danych wymarszu</h1>
        <h2>{event.name}</h2>
      </hgroup>
    </section>
  );
}
