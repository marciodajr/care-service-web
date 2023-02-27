import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles.css';

export const App = () => {

  const [ip, setIP] = useState('0.0.0.0');
  const [timeStamp, setTimeStamp] = useState(new Date());

  const getData = async () => {
    try {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(`${res.data.IPv4}`)
      setTimeStamp(new Date())
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
        Your IP Address is
        <br />
        {ip}
      </h2>
      <h4>{timeStamp.toString()}</h4>
    </div>
  );
}

