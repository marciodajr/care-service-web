import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getIP } from '../../services';
import './styles.css';

export const App = () => {
  const [ip, setIP] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const { isLoading, error, data } = useQuery('ip', getIP);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])

  useEffect(() => {
    const ts = new Date().toString();
    setTimestamp(ts);
    setIP(data?.data.ipString);
  }, [data])

  return (
    <div className="app">
      <h2>
        Service IP Address
      </h2>
      {isLoading && <h2>Carregando...</h2>}
      {!isLoading && (
        <>
          <h2 className="ip">{ip}</h2>
          <h4>{timestamp}</h4>
        </>
      )}
    </div>
  );
}

