import { Routes } from '../routes';
import text from './footer.json';

function Footer() {
  return (
    <footer class="container">
      <small>{text.copyright.text}</small>
      <hr />
      <div class="grid">
        <div>
          <a href={Routes.USAGE}>{text.links.usage.text}</a>
        </div>
        <div>
          <a href={Routes.PRIVACY}>{text.links.privacy.text}</a>
        </div>
        <div>
          <a href={Routes.MISCINFO}>{text.links.misc.text}</a>
        </div>
        <div>
          <a href={Routes.CHANGELOG}>{text.links.changes.text}</a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
