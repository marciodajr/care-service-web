import axios from 'axios';

export const getIP = async () => {
  return await axios.get('https://api.bigdatacloud.net/data/client-ip');
}
