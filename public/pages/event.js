import { useStore } from '@nanostores/preact';

import { appStateStore, EventStore } from '../state/stores';
import { Loading } from '../components/loading';

/**
 * @typedef {Object} EventProps
 * @property {Object} params
 * @property {number} params.id
 *
 * @param {EventProps} props
 * @returns {JSX.Element}
 */
export default function Event({ params }) {
  const event = useStore(EventStore(params.id.toString()));
  const { isLoading } = useStore(appStateStore);

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
