import { useCallback, useState } from 'preact/hooks';
import { login } from '../utils/auth';
import { useStoreon } from '../utils/state';

export default function Login() {
  const { dispatch } = useStoreon('tokens');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onReceiveToken = useCallback(
    (/** @type {String} */ token) => dispatch('csrftoken/set', token),
    [dispatch],
  );

  const formSubmit = async (
    /** @type {import("preact").JSX.TargetedEvent<HTMLFormElement, Event>} */ e,
  ) => {
    e.preventDefault();
    const res = await login(email, password);
    const token = res.get('csrf_refresh_token');
    if (token != null && typeof token === 'string') {
      onReceiveToken(token);
    }
    const err = res.get('error');
    if (err != null) {
      console.error('(%d) %s', res.get('status'), err);
    }
  };

  return (
    <section>
      <h1>Login form</h1>
      <article>
        <form onSubmit={(e) => formSubmit(e)}>
          <label>
            Email
            <input
              type="text"
              value={email}
              // @ts-ignore
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label>
            Hasło
            <input
              type="password"
              value={password}
              // @ts-ignore
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </article>
    </section>
  );
}
