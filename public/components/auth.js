import { Routes } from '../routes';

function AuthenticationRequired() {
  return (
    <section>
      <p>Ta strona jest dostępna tylko dla zalogowanych użytkowników.</p>
      <p>
        Zapraszamy na <a href={Routes.LOGIN}>stronę logowania</a>, gdzie można również
        założyć konto w serwisie.
      </p>
    </section>
  );
}

export { AuthenticationRequired };
