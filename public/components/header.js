import { Home } from 'preact-feather';

import { useStoreon } from '../utils/state';
import { Notifications } from './alert';

import text from './header.json';

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
    return <a href="/logout">{text.loginLink.whenAuthenticated.text}</a>;
  }
  return <a href="/login">{text.loginLink.whenAnon.text}</a>;
}

/**
 * @param {ElementProps} props
 * @returns {JSX.Element | null}
 */
function AccountElement({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <li>
        <a href="/account">{text.accountElement.whenAuthenticated.text}</a>
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
            <a href="/" aria-label={text.navbar.homeLink.ariaLabel}>
              <strong>
                <Home size={32} />
              </strong>
            </a>
          </li>
          <li>
            <a href="/events">{text.navbar.eventsLink.text}</a>
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
