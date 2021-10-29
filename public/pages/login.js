import { useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import { login, register } from '../utils/auth';
import { NotificationStyle, useNotifications } from '../utils/notifications';
import { setAccessToken, setCurrentUser, setRefreshToken } from '../state';
import { Routes } from '../routes';

import text from './login.json';

function FormBody({ email, emailSetter, password, passwordSetter, submitButtonText }) {
  return (
    <>
      <label>
        {text.form.email.label}
        <input
          type="text"
          value={email}
          // @ts-ignore
          onChange={(e) => emailSetter(e.target.value)}
          placeholder={text.form.email.label}
        />
      </label>
      <label>
        {text.form.password.label}
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
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const { addNotification } = useNotifications();

  const loc = useLocation();

  const formSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
    /** @type {string} */ operation,
  ) => {
    e.preventDefault();
    let res;
    if (operation === 'login') {
      res = await login(loginEmail, loginPassword);
    } else {
      res = await register(registerEmail, registerPassword);
    }
    if (res.ok) {
      if (res.csrfRefreshToken != null) {
        setRefreshToken(res.csrfRefreshToken);
      }
      if (res.csrfAccessToken != null) {
        setAccessToken(res.csrfAccessToken);
      }
      if (res.user != null) {
        setCurrentUser(res.user);
      }
      const flash = {
        style: NotificationStyle.SUCCESS,
        text: text.message.success,
      };
      addNotification(flash);
      loc.route(Routes.HOME);
    } else {
      console.error('(%d) %s', res.status, res.error);
      const flash = {
        style: NotificationStyle.ERROR,
        text: res.error || text.message.failure,
      };
      addNotification(flash);
    }
  };

  return (
    <section>
      <article class="grid">
        <div>
          <hgroup>
            <h2>{text.login.title}</h2>
            <h3>{text.login.subtitle}</h3>
          </hgroup>
          <form onSubmit={(e) => formSubmit(e, 'login')}>
            <FormBody
              key="form-login"
              email={loginEmail}
              emailSetter={setLoginEmail}
              password={loginPassword}
              passwordSetter={setLoginPassword}
              submitButtonText={text.login.submitButtonText}
            />
          </form>
        </div>
        <div>
          <hgroup>
            <h2>{text.register.title}</h2>
            <h3>{text.register.subtitle}</h3>
          </hgroup>
          <form onSubmit={(e) => formSubmit(e, 'register')}>
            <FormBody
              key="form-register"
              email={registerEmail}
              emailSetter={setRegisterEmail}
              password={registerPassword}
              passwordSetter={setRegisterPassword}
              submitButtonText={text.register.submitButtonText}
            />
          </form>
        </div>
      </article>
    </section>
  );
}
