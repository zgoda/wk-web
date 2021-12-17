import { useTitle } from 'hoofd/preact';

export default function MiscInfo() {
  useTitle('Informacje o aplikacji');
  return (
    <section>
      <hgroup>
        <h1>Informacje ogólne</h1>
        <h2>O programie, autorze i inne takie</h2>
      </hgroup>
    </section>
  );
}
