import { useTitle } from 'hoofd/preact';

export default function Privacy() {
  useTitle('Deklaracja poszanowania prywatności');
  return (
    <section>
      <hgroup>
        <h1>Deklaracja prywatności</h1>
        <h2>Co robimy, a czego nie robimy z Twoimi danymi</h2>
      </hgroup>
    </section>
  );
}
