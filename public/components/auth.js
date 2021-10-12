function AuthenticationRequired() {
  return (
    <section>
      <p>Ta strona jest dostępna tylko dla zalogowanych użytkowników.</p>
      <p>
        Zapraszamy na <a href="/login">stronę logowania</a>, gdzie można również założyć
        konto w serwisie.
      </p>
    </section>
  );
}

export { AuthenticationRequired };
