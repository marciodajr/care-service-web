import axios from 'axios';

const domain = 'twk.global';

export const getIP = async () => {
  return await axios.get(`http://ip-api.com/json/${domain}`);
}
