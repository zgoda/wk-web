import { useState } from 'preact/hooks';
import { Minus, Plus } from 'preact-feather';

export default function Home() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState('');

  const talkToApi = async () => {
    const url = '/api/hello';
    const resp = await fetch(url, {
      credentials: 'include',
    });
    const msgData = await resp.json();
    setResult(msgData.message);
  };

  return (
    <>
      <section>
        <h1>Home</h1>
        <p>This is the home page.</p>
        <div class="grid">
          <div>
            <button onClick={() => setCount(count - 1)}>
              <Minus />
            </button>
          </div>
          <div>
            <output>Count: {count}</output>
          </div>
          <div>
            <button onClick={() => setCount(count + 1)}>
              <Plus />
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2>A little clicky</h2>
        <p>
          <button onClick={() => talkToApi()}>Click me!</button>
        </p>
        <p>{result}</p>
      </section>
    </>
  );
}
