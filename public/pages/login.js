import { useCallback, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

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
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const loc = useLocation();

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
      res = await login(loginEmail, loginPassword);
    } else {
      res = await register(loginEmail, loginPassword);
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
      dispatch('user/set', { name: res.get('name'), email: res.get('email') });
      loc.route('/');
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
            email={loginEmail}
            emailSetter={setLoginEmail}
            password={loginPassword}
            passwordSetter={setLoginPassword}
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
            email={registerEmail}
            emailSetter={setRegisterEmail}
            password={registerPassword}
            passwordSetter={setRegisterPassword}
            submitButtonText="Zarejestruj"
          />
        </form>
      </div>
    </article>
  );
}
