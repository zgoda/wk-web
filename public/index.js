import 'preact/debug';
import {
  LocationProvider,
  Router,
  Route,
  lazy,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from 'preact-iso';

// components
import { Header } from './components/header';
import { Footer } from './components/footer';
// other contexts
import { NotificationsProvider } from './utils/notifications';
// route definitions
import { Routes } from './routes';
// styles
import '@csstools/normalize.css/normalize.css';
import './style.scss';

// lazy routes
const Home = lazy(() => import('./pages/home.js'));
const NotFound = lazy(() => import('./pages/_404.js'));
const Login = lazy(() => import('./pages/login.js'));
const Logout = lazy(() => import('./pages/logout.js'));
const Account = lazy(() => import('./pages/account.js'));
const Events = lazy(() => import('./pages/events.js'));
const CreateEvent = lazy(() => import('./pages/createevent.js'));
const Event = lazy(() => import('./pages/event.js'));

export function App() {
  return (
    <LocationProvider>
      <NotificationsProvider>
        <Header />
        <main class="container">
          <ErrorBoundary>
            <Router>
              <Home path={Routes.HOME} />
              <Route path={Routes.LOGIN} component={Login} />
              <Route path={Routes.LOGOUT} component={Logout} />
              <Route path={Routes.ACCOUNT} component={Account} />
              <Route path={Routes.EVENTS} component={Events} />
              <Route path={Routes.CREATEEVENT} component={CreateEvent} />
              <Route path={Routes.EVENT} component={Event} />
              <Route default component={NotFound} />
            </Router>
          </ErrorBoundary>
        </main>
        <Footer />
      </NotificationsProvider>
    </LocationProvider>
  );
}

hydrate(<App />);

/**
 * @param {import("preact").JSX.IntrinsicAttributes} data
 */
export async function prerender(data) {
  return await ssr(<App {...data} />);
}
