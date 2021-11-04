import { Routes } from '../routes';
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
        <header>
          <h2>{text.sbs.title}</h2>
        </header>
        {text.sbs.intro.map((line, index) => (
          <p key={`sbs-intro-l-${index}`}>{line}</p>
        ))}
        <ul>
          <li>
            <a href={Routes.LOGIN}>{text.sbs.youLogIn.text}</a>
          </li>
          <li>
            <a href={Routes.EVENTS}>wybierasz marsz</a> do którego chcesz dołączyć...
          </li>
          <li>
            ...albo <a href={Routes.CREATEEVENT}>zgłaszasz swój własny</a>
          </li>
          <li>{text.sbs.youWalkIt.text}</li>
          <li>{text.sbs.youReportBack.text}</li>
          <li>{text.sbs.youRepeat.text}</li>
        </ul>
        <p>
          Prawda że prościej się nie da? No to <strong>przejdźmy się</strong>!
        </p>
      </section>
    </>
  );
}
