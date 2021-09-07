import {
  LocationProvider,
  Router,
  Route,
  lazy,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from 'preact-iso';
import Header from './header.js';

const Home = lazy(() => import('./pages/home.js'));
const About = lazy(() => import('./pages/about.js'));
const NotFound = lazy(() => import('./pages/_404.js'));

export function App() {
  return (
    <LocationProvider>
      <main class="container">
        <Header />
        <ErrorBoundary>
          <Router>
            <Home path="/" />
            <Route path="/about" component={About} />
            <Route default component={NotFound} />
          </Router>
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
