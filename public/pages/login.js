import { useStoreon } from '../index';
import { useCallback } from 'preact/hooks';

export default function Login() {
  const { dispatch } = useStoreon('tokens');
  const onReceiveToken = useCallback(
    (token) => dispatch('tokens/set', token),
    [dispatch],
  );
  return (
    <section>
      <h1>Login form</h1>
      <p>Here will be our login form.</p>
    </section>
  );
}
