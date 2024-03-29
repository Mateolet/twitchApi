const axios = require('axios');
const streamers = ['telefe', 'facubanzas', 'santutu', 'c0ker'];
const url = 'https://id.twitch.tv/oauth2/token';

const prod = {
  client_id: 'mgowtcq93b8oxmd3uh5gsrl2khpg55',
  client_secret: 'thszqqj6f66wm5g8uvfd53b119gjgn',
  grant_type: 'client_credentials',
};

const token = async () => {
  const response = await axios.post(url, prod);
  return response.data;
};

let headers = {
  'Client-Id': '',
  Authorization: '',
};

const getStreamers = async () => {
  const data = await token();
  if (data) {
    headers['Authorization'] = `Bearer ${data.access_token}`;
    headers['Client-Id'] = prod.client_id;

    try {
      const promises = streamers.map(async (streamer) => {
        const res = await axios.get(
          `https://api.twitch.tv/helix/streams?user_login=${streamer}`,
          { headers }
        );
        const res2 = await axios.get(
          `https://api.twitch.tv/helix/users?login=${streamer}`,
          { headers }
        );
        return { streams: res.data.data, users: res2.data.data };
      });

      return await Promise.all(promises);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

module.exports = { getStreamers };
