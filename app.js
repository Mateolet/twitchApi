const express = require('express')
const axios = require('axios')
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
  console.log('hola')
})

// const pathRequest = 
// ID CLIENTE mgowtcq93b8oxmd3uh5gsrl2khpg55
//ID SECRETO thszqqj6f66wm5g8uvfd53b119gjgn

// {
//   "access_token": "fzycgb37n405xz7933rkll8mz9u8yd",
//   "expires_in": 4775999,
//   "token_type": "bearer"
// }

const prod = {
  "client_id": "mgowtcq93b8oxmd3uh5gsrl2khpg55",
  "client_secret": "thszqqj6f66wm5g8uvfd53b119gjgn",
  "grant_type": "client_credentials"
}
const url = 'https://id.twitch.tv/oauth2/token';
const token = async () => {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', prod);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
let headers = {
  "Client-Id":'',
  "Authorization":''
};
token().then(data => {
    headers["Authorization"] = `Bearer ${data.access_token}`;
    headers["Client-Id"] = prod.client_id;
    // console.log(headers);
    // return;
    axios.get('https://api.twitch.tv/helix/streams?user_login=C0ker',{headers})
    .then(res => console.log(res.data))

  });








// const login = ()=>{
  
// }



app.listen(3000)
