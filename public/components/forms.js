import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { useStore } from '@nanostores/preact';

import { createEvent } from '../utils/api';
import { NotificationStyle, useNotifications } from '../utils/notifications';
import { tokenStore } from '../state/stores';
import { Routes } from '../routes';

import text from './forms.json';

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

  const tokens = useStore(tokenStore);

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
    const rv = await createEvent(
      event,
      tokens.csrfAccessToken,
      tokens.csrfRefreshToken,
    );
    if (rv.resp.ok) {
      const flash = {
        style: NotificationStyle.SUCCESS,
        text: text.createevent.messages.success,
      };
      addNotification(flash);
      loc.route(Routes.EVENTS);
    }
  };

  return (
    <div class="formBody">
      <form onSubmit={handleFormSubmit}>
        <label>
          {text.createevent.fields.name}
          <input
            type="text"
            value={name}
            // @ts-ignore
            onInput={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          {text.createevent.fields.date}
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            // @ts-ignore
            onInput={(e) => setDate(new Date(e.target.value))}
            required
          />
        </label>
        <label>
          {text.createevent.fields.length}
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
          {text.createevent.fields.location}
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
            {text.createevent.fields.virtual}
          </label>
        </fieldset>
        <fieldset>
          <label>
            <input type="checkbox" checked={isPublic} onClick={togglePublic} />
            {text.createevent.fields.public}
          </label>
        </fieldset>
        <label>
          {text.createevent.fields.description}
          <textarea
            value={description}
            // @ts-ignore
            onInput={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">{text.createevent.submit.text}</button>
      </form>
    </div>
  );
}

export { EventForm };
