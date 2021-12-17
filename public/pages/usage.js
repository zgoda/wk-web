import { useTitle } from 'hoofd/preact';

export default function Usage() {
  useTitle('Instrukcja korzystania z serwisu');
  return (
    <section>
      <hgroup>
        <h1>Korzystanie z serwisu</h1>
        <h2>Kilka słów instrukcji</h2>
      </hgroup>
    </section>
  );
}
