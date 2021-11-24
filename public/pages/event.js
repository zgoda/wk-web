import { useEffect, useState } from 'preact/hooks';

import { Loading } from '../components/loading';
import { fetchEvent } from '../utils/api';

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
          <h1>Szczegóły wymarszu</h1>
          <h2>{event.name}</h2>
        </hgroup>
      </header>
      <div class="grid">
        <div>
          <p>Utworzony</p>
        </div>
        <div>
          <p>{event.created.toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
}
