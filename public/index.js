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
// state utils
import { store } from './state';
import { CustomContext } from './utils/state';
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

export function App() {
  return (
    <LocationProvider>
      <CustomContext.Provider value={store}>
        <Header />
        <main class="container">
          <ErrorBoundary>
            <Router>
              <Home path="/" />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/account" component={Account} />
              <Route path="/events" component={Events} />
              <Route default component={NotFound} />
            </Router>
          </ErrorBoundary>
        </main>
        <Footer />
      </CustomContext.Provider>
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
