import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';

import { Routes } from '../routes';

function AuthenticationRequired() {
  const loc = useLocation();

  useEffect(() => {
    const tm = setTimeout(() => loc.route(Routes.LOGIN), 6000);
    return () => clearTimeout(tm);
  }, [loc]);

  return (
    <section>
      <hgroup>
        <h1>Strona dostępna po zalogowaniu</h1>
        <h2>Prosimy przejść do strony logowania</h2>
      </hgroup>
      <p>Ta strona jest dostępna tylko dla zalogowanych użytkowników.</p>
      <p>
        Zapraszamy na <a href={Routes.LOGIN}>stronę logowania</a>, gdzie można również
        założyć konto w serwisie. Za kilka sekund zostaniesz tam przeniesiony
        automatycznie.
      </p>
    </section>
  );
}

export { AuthenticationRequired };
