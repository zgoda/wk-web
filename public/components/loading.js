import text from './loading.json';

function Loading() {
  return (
    <section>
      <hgroup>
        <h1>{text.title}</h1>
        <h2>{text.subtitle}</h2>
      </hgroup>
    </section>
  );
}

export { Loading };
