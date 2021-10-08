import text from './events.json';

export default function Events() {
  return (
    <section>
      <header>
        <hgroup>
          <h1>{text.title}</h1>
          <h2>{text.subtitle}</h2>
        </hgroup>
      </header>
      <p>Wydarzenia</p>
    </section>
  );
}
