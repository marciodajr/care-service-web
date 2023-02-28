import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ip, setIP] = useState('');
  const [timeStamp, setTimeStamp] = useState('');
  const domain = 'twk.global'

  const getData = async () => {
    try {
      await axios.get(`http://ip-api.com/json/${domain}`).then((res) => {
        const ts = new Date();
        setIP(`${res.data.query}`);
        setTimeStamp(ts.toString());
        setIsLoading(false);
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="app">
      <h2>
        Service IP Address
      </h2>
      {isLoading && <h2>Carregando...</h2>}
      {!isLoading && (
        <>
          <h2 className="ip">{ip}</h2>
          <h4>{timeStamp.toString()}</h4>
        </>
      )}
    </div>
  );
}

