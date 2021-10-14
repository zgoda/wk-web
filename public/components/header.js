import { Home } from 'preact-feather';

import { useStoreon } from '../utils/state';
import { Notifications } from './alert';

/**
 * @typedef {Object} ElementProps
 * @property {boolean} isAuthenticated
 */

/**
 * @param {ElementProps} props
 * @returns {JSX.Element}
 */
function LoginLink({ isAuthenticated }) {
  if (isAuthenticated) {
    return <a href="/logout">Wyloguj</a>;
  }
  return <a href="/login">Strona logowania</a>;
}

/**
 * @param {ElementProps} props
 * @returns {JSX.Element | null}
 */
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
  const { currentUser } = useStoreon('currentUser');
  const isAuthenticated = currentUser != null;

  return (
    <>
      <nav class="container">
        <ul>
          <li>
            <a href="/" aria-label="Początek">
              <strong>
                <Home size={32} />
              </strong>
            </a>
          </li>
          <li>
            <a href="/events">Wydarzenia</a>
          </li>
        </ul>
        <ul>
          <li>
            <LoginLink isAuthenticated={isAuthenticated} />
          </li>
          <AccountElement isAuthenticated={isAuthenticated} />
        </ul>
      </nav>
      <div class="container">
        <Notifications />
      </div>
    </>
  );
}
