// @ts-nocheck
import { useStoreon } from '../index';
import { useCallback, useState } from 'preact/hooks';
import Cookies from 'universal-cookie';

export default function Login() {
  const cookies = new Cookies();
  const { dispatch } = useStoreon('tokens');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onReceiveToken = useCallback(
    (token) => dispatch('tokens/set', token),
    [dispatch],
  );
  const formSubmit = async (e) => {
    e.preventDefault();
    const url = '/auth/v1/login';
    const resp = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const text = await resp.text();
    console.log(cookies.get('csrf_refresh_token'));
    console.log(text);
    const data = JSON.parse(text);
    onReceiveToken(data.access_token);
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </label>
          <label>
            Hasło
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </article>
    </section>
  );
}
