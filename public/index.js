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
const EditEvent = lazy(() => import('./pages/editevent.js'));
const Usage = lazy(() => import('./pages/usage.js'));
const Privacy = lazy(() => import('./pages/privacy.js'));
const MiscInfo = lazy(() => import('./pages/miscinfo.js'));
const ChangeLog = lazy(() => import('./pages/changelog.js'));

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
              <Route path={Routes.EDITEVENT} component={EditEvent} />
              <Route path={Routes.USAGE} component={Usage} />
              <Route path={Routes.PRIVACY} component={Privacy} />
              <Route path={Routes.MISCINFO} component={MiscInfo} />
              <Route path={Routes.CHANGELOG} component={ChangeLog} />
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
