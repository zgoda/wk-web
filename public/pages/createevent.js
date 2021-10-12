import { AuthenticationRequired } from '../components/auth';
import { EventForm } from '../components/forms';
import { useStoreon } from '../utils/state';
import text from './createevent.json';

export default function CreateEvent() {
  const { currentUser } = useStoreon('currentUser');

  if (currentUser == null) {
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
      <EventForm />
    </section>
  );
}
