import { useStore } from '@nanostores/preact';
import { EventStore } from '../state/stores';

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

  return (
    <section>
      <header>
        <hgroup>
          <h1>Szczegóły wymarszu</h1>
          <h2>{event.name}</h2>
        </hgroup>
      </header>
    </section>
  );
}
