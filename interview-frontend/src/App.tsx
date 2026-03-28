import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="bg-sitebg">
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button className="rounded bg-primary" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
          <h1 className="text-3xl font-bold underline font-inter">Hello world!</h1>
      </section>

      <div className=""></div>

      <div className=""></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
