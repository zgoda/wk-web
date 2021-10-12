import text from './createevent.json';

export default function CreateEvent() {
  return (
    <section>
      <header>
        <hgroup>
          <h1>{text.title}</h1>
          <h2>{text.subtitle}</h2>
        </hgroup>
      </header>
    </section>
  );
}
