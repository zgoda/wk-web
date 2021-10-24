import text from './footer.json';

function Footer() {
  return (
    <footer class="container">
      <small>{text.copyright.text}</small>
      <hr />
      <div class="grid">
        <div>{text.links.usage.text}</div>
        <div>{text.links.privacy.text}</div>
        <div>{text.links.misc.text}</div>
        <div>{text.links.changes.text}</div>
      </div>
    </footer>
  );
}

export { Footer };
