import { useStore } from '@nanostores/preact';
import { useTitle } from 'hoofd/preact';

import { AuthenticationRequired } from '../components/auth';
import { EditMode, EventForm } from '../components/forms';
import { sessionStore } from '../state/stores';

import text from './createevent.json';

export default function CreateEvent() {
  useTitle('Tworzenie nowego wydarzenia');
  const session = useStore(sessionStore);

  if (session.currentUser == null) {
    return <AuthenticationRequired />;
  }

  return (
    <section>
      <header>
        <hgroup>
          <h1>{text.title}</h1>
          <h2>{text.subtitle}</h2>
        </hgroup>
      </header>
      <EventForm editMode={EditMode.CREATE} />
    </section>
  );
}
