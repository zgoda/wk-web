import text from './home.json';

export default function Home() {
  return (
    <section>
      <h1>Wymarsze kwartalne</h1>
      {text.intro.map((line, index) => (
        <p key={`intro-l-${index}`}>{line}</p>
      ))}
    </section>
  );
}
