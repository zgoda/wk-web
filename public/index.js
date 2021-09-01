import {
  LocationProvider, Router, Route, lazy, ErrorBoundary, hydrate, prerender as ssr
} from 'preact-iso';
import Home from './pages/home/index.js';
import NotFound from './pages/_404.js';
import Header from './header.js';

const About = lazy(() => import('./pages/about/index.js'));

export function App() {
  return (
    <LocationProvider>
      <main class="container">
        <Header />
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
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
