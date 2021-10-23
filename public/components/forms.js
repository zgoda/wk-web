import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import { createEvent } from '../utils/api';
import { useStoreon } from '../utils/state';
import { useNotifications } from '../utils/notifications';

function EventForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [length, setLength] = useState(20);
  const [location, setLocation] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');

  const { addNotification } = useNotifications();

  const loc = useLocation();

  const { csrfAccessToken, csrfRefreshToken } = useStoreon(
    'csrfAccessToken',
    'csrfRefreshToken',
  );

  const toggleVirtual = () => setIsVirtual(!isVirtual);
  const togglePublic = () => setIsPublic(!isPublic);

  const handleFormSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    /**
     * @type {import('../..').Event}
     */
    const event = {
      name,
      date: date.getTime(),
      length,
      location,
      virtual: isVirtual,
      public: isPublic,
    };
    const rv = await createEvent(event, csrfAccessToken, csrfRefreshToken);
    if (rv.resp.ok) {
      const flash = {
        style: 'success',
        text: 'Wymarsz został utworzony',
      };
      addNotification(flash);
      loc.route('/events');
    }
  };

  return (
    <div class="formBody">
      <form onSubmit={handleFormSubmit}>
        <label>
          Nazwa
          <input
            type="text"
            value={name}
            // @ts-ignore
            onInput={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Data
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            // @ts-ignore
            onInput={(e) => setDate(new Date(e.target.value))}
            required
          />
        </label>
        <label>
          Długość trasy
          <input
            type="number"
            min="1"
            max="50"
            value={length}
            // @ts-ignore
            onInput={(e) => setLength(e.target.value)}
            required
          />
        </label>
        <label>
          Lokalizacja
          <input
            type="text"
            value={location}
            // @ts-ignore
            onInput={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <fieldset>
          <label>
            <input type="checkbox" checked={isVirtual} onClick={toggleVirtual} />
            Wirtualny
          </label>
        </fieldset>
        <fieldset>
          <label>
            <input type="checkbox" checked={isPublic} onClick={togglePublic} />
            Publiczny
          </label>
        </fieldset>
        <label>
          Opis
          <textarea
            value={description}
            // @ts-ignore
            onInput={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
}

export { EventForm };
