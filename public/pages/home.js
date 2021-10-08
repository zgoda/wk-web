import text from './home.json';

export default function Home() {
  return (
    <>
      <section>
        <header>
          <hgroup>
            <h1>{text.title}</h1>
            <h2>{text.subtitle}</h2>
          </hgroup>
        </header>
        {text.intro.map((line, index) => (
          <p key={`intro-l-${index}`}>{line}</p>
        ))}
      </section>
      <section>
        <h2>Jak to działa?</h2>
        <ul>
          <li>
            <a href="/login">logujesz się</a>
          </li>
          <li>
            <a href="/events">wybierasz marsz</a> do którego chcesz dołączyć...
          </li>
          <li>...albo zgłaszasz swój własny</li>
          <li>idziesz tempem jakie lubisz (to już poza aplikacją!)</li>
          <li>
            zdajesz relację (zdjęcia, film, opis słowno-muzyczny, zapis trasy z GPS, co
            chcesz)
          </li>
          <li>...i za jakiś czas powtórka</li>
        </ul>
        <p>
          Prawda że prościej się nie da? No to <strong>przejdźmy się</strong>!
        </p>
      </section>
    </>
  );
}
