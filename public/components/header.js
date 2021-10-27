import { useStore } from '@nanostores/preact';
import { Home } from 'preact-feather';

import { sessionStore } from '../state';
import { Notifications } from './alert';
import { Routes } from '../routes';

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
    return <a href={Routes.LOGOUT}>{text.loginLink.whenAuthenticated.text}</a>;
  }
  return <a href={Routes.LOGIN}>{text.loginLink.whenAnon.text}</a>;
}

/**
 * @param {ElementProps} props
 * @returns {JSX.Element | null}
 */
function AccountElement({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <li>
        <a href={Routes.ACCOUNT}>{text.accountElement.whenAuthenticated.text}</a>
      </li>
    );
  }
  return null;
}

export function Header() {
  const session = useStore(sessionStore);
  const isAuthenticated = session.currentUser != null;

  return (
    <>
      <nav class="container">
        <ul>
          <li>
            <a href={Routes.HOME} aria-label={text.navbar.homeLink.ariaLabel}>
              <strong>
                <Home size={32} />
              </strong>
            </a>
          </li>
          <li>
            <a href={Routes.EVENTS}>{text.navbar.eventsLink.text}</a>
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
