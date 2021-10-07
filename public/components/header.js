import { Home } from 'preact-feather';

import { useStoreon } from '../utils/state';
import { isAuthenticated as checkAuth } from '../utils/auth';

function LoginLink({ isAuthenticated }) {
  if (isAuthenticated) {
    return <a href="/logout">Wyloguj</a>;
  }
  return <a href="/login">Strona logowania</a>;
}

function AccountElement({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <li>
        <a href="/account">Konto</a>
      </li>
    );
  }
  return null;
}

export function Header() {
  const { csrfToken, accessToken } = useStoreon('csrfToken', 'accessToken');

  const isAuthenticated = checkAuth(csrfToken, accessToken);

  return (
    <nav class="container">
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
          <LoginLink isAuthenticated={isAuthenticated} />
        </li>
        <AccountElement isAuthenticated={isAuthenticated} />
      </ul>
    </nav>
  );
}
