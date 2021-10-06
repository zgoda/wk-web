import { useCallback, useState } from 'preact/hooks';
import { login, register } from '../utils/auth';
import { useStoreon } from '../utils/state';

function FormBody({ email, emailSetter, password, passwordSetter, submitButtonText }) {
  return (
    <>
      <label>
        Email
        <input
          type="text"
          value={email}
          // @ts-ignore
          onChange={(e) => emailSetter(e.target.value)}
          placeholder="Email"
        />
      </label>
      <label>
        Hasło
        <input
          type="password"
          value={password}
          // @ts-ignore
          onChange={(e) => passwordSetter(e.target.value)}
        />
      </label>
      <button type="submit">{submitButtonText}</button>
    </>
  );
}

export default function Login() {
  const { dispatch } = useStoreon('tokens');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onReceiveToken = useCallback(
    (/** @type {string} */ token, /** @type {string} */ tokenType) => {
      dispatch(`${tokenType}token/set`, token);
    },
    [dispatch],
  );

  const formSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
    /** @type {string} */ operation,
  ) => {
    e.preventDefault();
    let res;
    if (operation === 'login') {
      res = await login(email, password);
    } else {
      res = await register(email, password);
    }
    const err = res.get('error');
    if (!err) {
      let token = res.get('csrf_refresh_token');
      if (token != null) {
        onReceiveToken(token.toString(), 'csrf');
      }
      token = res.get('access_token');
      if (token != null) {
        onReceiveToken(token.toString(), 'access');
      }
    } else {
      console.error('(%d) %s', res.get('status'), err);
    }
  };

  return (
    <article class="grid">
      <div>
        <hgroup>
          <h2>Zaloguj się</h2>
          <h3>Jeżeli masz już u nas konto</h3>
        </hgroup>
        <form onSubmit={(e) => formSubmit(e, 'login')}>
          <FormBody
            key="form-login"
            email={email}
            emailSetter={setEmail}
            password={password}
            passwordSetter={setPassword}
            submitButtonText="Zaloguj"
          />
        </form>
      </div>
      <div>
        <hgroup>
          <h2>Załóż konto</h2>
          <h3>Jeżeli chcesz dołączyć do naszej społeczności</h3>
        </hgroup>
        <form onSubmit={(e) => formSubmit(e, 'register')}>
          <FormBody
            key="form-register"
            email={email}
            emailSetter={setEmail}
            password={password}
            passwordSetter={setPassword}
            submitButtonText="Zarejestruj"
          />
        </form>
      </div>
    </article>
  );
}
