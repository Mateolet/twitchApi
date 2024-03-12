// server.js
const express = require('express');
const axios = require('axios')
const streamers = ['telefe', 'facubanzas', 'juanposite', 'c0ker'];

const prod = {
  client_id: 'mgowtcq93b8oxmd3uh5gsrl2khpg55',
  client_secret: 'thszqqj6f66wm5g8uvfd53b119gjgn',
  grant_type: 'client_credentials',
};

const url = 'https://id.twitch.tv/oauth2/token';
const token = async () => {
  const response =  await axios.post(url, prod)
  return response.data;
}

let headers = {
  'Client-Id': '',
  'Authorization': '',
};

const dataStreamers = async () => {
  const data = await token();
  if (data) {
    headers['Authorization'] = `Bearer ${data.access_token}`;
    headers['Client-Id'] = prod.client_id;
  }
  
  try {
    streamers.forEach(async (streamer) => {
      const res = await axios.get(
        `https://api.twitch.tv/helix/streams?user_login=${streamer}`,
        { headers }
      );
      const res2 = await axios.get(
        `https://api.twitch.tv/helix/users?login=${streamer}`,
        { headers }
      );

      const arr1 = res.data.data;
      const arr2 = res2.data.data;
      mostrarArr(arr1, arr2)
    });
  } catch (error) {
    console.log(error);
  }
};

const mostrarArr = (arr1, arr2) => {
  arr1.forEach((e) => {
    arr2.forEach((l) => {
      console.log('arr2 user: ', l.display_name);
      console.log(
        'arr1 game name: ',
        e.game_name ? e.game_name : 'No estoy en vivo'
      );
      console.log('arr2 img: ', l.profile_image_url);
    });
  });
};

dataStreamers()
