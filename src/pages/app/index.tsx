import { useEffect, useState } from 'react';
import './styles.css';

export const App = () => {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const ts = new Date().toString();
    setTimestamp(ts);
  }, [])

  return (
    <div className="app">
      <h2>
        Service IP Address
      </h2>
      <h2 className="ip">[INTERNAL_IP]</h2>
      <h4>{timestamp}</h4>
    </div>
  );
}

