import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import { useStore } from '@nanostores/preact';

import { createEvent, updateEvent } from '../utils/api';
import { NotificationStyle, useNotifications } from '../utils/notifications';
import { tokenStore } from '../state/stores';
import { Routes } from '../routes';

import text from './forms.json';

export const EditMode = Object.freeze({
  EDIT: 'e',
  CREATE: 'c',
});

const EDITMODE_MAP = Object.freeze({
  e: updateEvent,
  c: createEvent,
});

/**
 * @typedef {object} EventFormProps
 * @property {string} editMode
 * @property {import('../..').EventData} [event=null]
 *
 * @param {EventFormProps} props
 * @returns {JSX.Element}
 */
export function EventForm({ editMode, event }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [length, setLength] = useState(20);
  const [location, setLocation] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event != null) {
      setName(event.name);
      setDate(event.date);
      setLength(event.length);
      setLocation(event.location);
      setIsVirtual(event.virtual);
      setIsPublic(event.public);
      setDescription(event.description || '');
    }
  }, [event]);

  const { addNotification } = useNotifications();

  const loc = useLocation();

  const tokens = useStore(tokenStore);

  const toggleVirtual = () => setIsVirtual(!isVirtual);
  const togglePublic = () => setIsPublic(!isPublic);

  const handleFormSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    const eventId = editMode === EditMode.CREATE ? 0 : event.eventId;
    const eventData = {
      eventId,
      name,
      date,
      length,
      location,
      virtual: isVirtual,
      public: isPublic,
      description,
    };
    const func = EDITMODE_MAP[editMode];
    const rv = await func(eventData, tokens.csrfAccessToken, tokens.csrfRefreshToken);
    if (rv.resp.ok) {
      const flash = {
        style: NotificationStyle.SUCCESS,
        text:
          editMode === EditMode.CREATE
            ? text.createevent.messages.success
            : text.editevent.messages.success,
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
