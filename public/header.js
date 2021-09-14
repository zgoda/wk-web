import { Home } from 'preact-feather';

export function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/" aria-label="Początek">
              <strong>
                <Home />
              </strong>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/error">Error</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
