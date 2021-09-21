import {
  LocationProvider,
  Router,
  Route,
  lazy,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from 'preact-iso';

import { Header } from './header.js';
import { store } from './state';
import { CustomContext } from './utils/state';

const Home = lazy(() => import('./pages/home.js'));
const About = lazy(() => import('./pages/about.js'));
const NotFound = lazy(() => import('./pages/_404.js'));
const Login = lazy(() => import('./pages/login.js'));

export function App() {
  return (
    <LocationProvider>
      <main class="container">
        <Header />
        <ErrorBoundary>
          <CustomContext.Provider value={store}>
            <Router>
              <Home path="/" />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route default component={NotFound} />
            </Router>
          </CustomContext.Provider>
        </ErrorBoundary>
      </main>
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
