import { Home } from 'preact-feather';

import { useStoreon } from './utils/state';
import { isAuthenticated as checkAuth } from './utils/auth';

function LoginLink({ isAuthenticated }) {
  if (isAuthenticated) {
    return <a href="/logout">Wyloguj</a>;
  }
  return <a href="/login">Zaloguj</a>;
}

export function Header() {
  const { csrfToken, accessToken } = useStoreon('csrfToken', 'accessToken');

  const isAuthenticated = checkAuth(csrfToken, accessToken);

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
          <li>
            <LoginLink isAuthenticated={isAuthenticated} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
