import {
  LocationProvider,
  Router,
  Route,
  lazy,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from 'preact-iso';

import { Header } from './header';
import { Footer } from './footer';
import { store } from './state';
import { CustomContext } from './utils/state';

import '@csstools/normalize.css/normalize.css';
import './style.scss';

const Home = lazy(() => import('./pages/home.js'));
const NotFound = lazy(() => import('./pages/_404.js'));
const Login = lazy(() => import('./pages/login.js'));
const Logout = lazy(() => import('./pages/logout.js'));

export function App() {
  return (
    <LocationProvider>
      <Header />
      <main class="container">
        <ErrorBoundary>
          <CustomContext.Provider value={store}>
            <Router>
              <Home path="/" />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route default component={NotFound} />
            </Router>
          </CustomContext.Provider>
        </ErrorBoundary>
      </main>
      <Footer />
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
