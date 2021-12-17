import { useTitle } from 'hoofd/preact';

export default function ChangeLog() {
  useTitle('Dziennik zmian');
  return (
    <section>
      <hgroup>
        <h1>Dziennik zmian</h1>
        <h2>Zmiany, panie Janie, zmiany!</h2>
      </hgroup>
    </section>
  );
}
