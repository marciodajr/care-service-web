import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getIP } from '../../services';
import './styles.css';

export const App = () => {
  const [ip, setIP] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const { isLoading, error, data } = useQuery('getIP', getIP)

  useEffect(() => {
    console.log(error);
  }, [error,])

  useEffect(() => {
    setIP(data?.data.query)
    setTimestamp(new Date().toString());
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

