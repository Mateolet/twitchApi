const streamersContainer = document.getElementById('streamersContainer');

let userData = [];
const streamers = ['telefe', 'rubius', 'juanposite', 'c0ker'];

const prod = {
  client_id: 'mgowtcq93b8oxmd3uh5gsrl2khpg55',
  client_secret: 'thszqqj6f66wm5g8uvfd53b119gjgn',
  grant_type: 'client_credentials',
};

const url = 'https://id.twitch.tv/oauth2/token';

const token = async () => {
  try {
    const response = await axios.post(url, prod);
    if (response.status === 200) {
      handleLogging(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

let headers = {
  'Client-Id': '',
  Authorization: '',
};

const handleLogging = async (data) => {
  if (data) {
    headers['Authorization'] = `Bearer ${data.access_token}`;
    headers['Client-Id'] = prod.client_id;
  }
  if (headers['Authorization'] !== '' && headers['Client-Id'] !== '') {
    try {
      await Promise.all(
        streamers.map(async (streamer) => {
          const res = await axios.get(
            `https://api.twitch.tv/helix/streams?user_login=${streamer}`,
            { headers }
          );
          if (res.status === 200) {
            userData = res.data.data;
            console.log(userData);
            displayData();
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
};

token();

const displayData = () => {
  userData.forEach((data) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <figure>
        <img src=${data.thumbnail_url} />
        <h3>${data.user_name}</h3>
        <p>${data.game_name}</p>
        <p>${data.viewer_count}</p>
      </figure>
    `;
    streamersContainer.appendChild(div);
  });
};
