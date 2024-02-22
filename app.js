const express = require('express');
const axios = require('axios');
const app = express();
// const HmCrypto = require('./index');
// const fs = require('fs');
// const path = require('path');
// const BASE_URL = 'https://api.hub88.io';
// const GAMES_ENDPOINT = '/operator/generic/v2/game/list';
// const PRIVATE_KEY =
//   'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+zOh2bftwbP616fP3l+hRU5I0bbvKCEWPHbGQOTSZ6hLlvizTMBg7xhybfy8oMd8IYXzLMDfXIlIhPJa0TxpZHJh67uV8uJuQ4LyU4DNuQwKGFCzWh9xlzI9x2XLHxiblPUhQIegU3pCPoWIcG3eJ5w4Y/43yyD0eV+GwsB6UTFexLMz45hdnRogquEoQI4QfrogBKOsAg4QAXFXQer2dEj8YKtqzT6v1fibjX/ycioK2sKJJiKexm2KipUmmCMA13w4fI1lU5tPuz7ntlv6ZTsRtX4410re/8OyB4GiyKP6Tb6UI8fAO3us1a9fgjuf2Ois8aDlTAVGzem0SOREjAgMBAAECggEBALQc5sz1Ychte7zqTx3JTsuG4puPgxhi2pcRZs9I0TkCWDh8YAA0hIvYpqS7WR7OhUZ6EL4WlIAHrBQoB/PKQIsijWZvIj+sXV5UaHD5fFN3+mfrn7AcrJeElVzZ8ppXmdwJD7xlZZpdx4VuyRjTbPLHJO3AQJWRJPEB8NFEUHmYPdkdIfngj5hffDUekd70NNrrDiWvE/w6zdohqCsHiEcpGJARmoU8crU9cg4oaIhCjHOPCNKTabXC3JOxXhZrDI+vlW3UBTIzftAGoK4buRU0VAJxeUAkDHNn2l9FRcVWJM154hJEUrtohhIO/Ah5Mz27GKH3jIN6LPteTS9vJrECgYEA6JHexnlzlClTl3l3pVxYGwOWDFvQ4Y/KcpFvCVfvtOFZZ39VdxK3cZp6/ijIGYkq+5vAhne449i5BNIErT609KGZh2ufF4vWA00DFzrwMlaB9SvXuTZ4bXOWy0gV5efaU6mRqeBWBxGzurPNQezc8r0vnQJTjIn3mTardd0AivcCgYEA0gXHFvq3I5fL6I38R6hj1n0EAxyi/Dn7hg3cP792Af5piO3koYtlWxzvDSvuOAio26bi6kxC9w/s2+WS9N/ag/CDxfTumUUDAakmlXyEUtlRNAdvgIKHiEuwUQPEYeQN26sy4s1IQsz4/3xG8WuEfbKa8+8VVcSIcsoTYXKHFDUCgYAf/cjONnCupcyo3n2V0pEQDjs6sfqWvIfVoKnMeDsx/3mj4gEoovt29hALHCMCWDsAZ1lhZeCZ/vrcbeNUzXZo3D3ZQfWdcI/c3mAZdvMJiZrQ1doT0SlZrPfGOMFCYdVHguDVpFVRHZ9ChG8srV9rSJjfGS3S/DuB6OJHEUJ82wKBgB5zVABS7YatlZTsMS26jm8kxRYmasMjLQKss8hSXCvB1U9THpkFevaQ5WAFhI5/QuxF8BSEZhkoJ/FiAcKbSjVjA9gJwSZbySnOepel7BGPDKT8hwAc7MWoI7I7V5fR1uiIk+IqXVXCHj/8ptSOADGxWaIQgglja10pS1IPpuIZAoGAOWxLniOOH0PDlq00JdoyAsMm4Kpj7c0FrcYs3Ny/3krhKs4xn/LraNLH+L8YzU4/stdnqTqfkAekKJ+/dTyCG5pUrAQgYAs61m/a2y+jUqcCAFXg/92f+YcnhONJEyO9YD4ZxlzLaNkTBQwRTHSDn3O0Tdhpm7w0GDd/4qLUIlc=';
// const PUBLIC_KEY =
//   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5FydjwhmnFtyAH7izb7XoKpilU9yoh61JsENugTvhY6zvsoCltiRdA4CPk5BEC4QbG5Nzy09MBEXIUXnhnUPbYyfiwfC84p5LvEijXSHj5KAZS2vP/YcmDLG/cP+nzAoLWSH1n1+sc8Jcj47iOj1eA7XvzlaXWmaGe6PFcyuC0hFQg1RnD5HMs1hW5fPBT7xM5jrHYzJwsPbAGHEvQpwFt7hy3EsP8Ff4nlCF2iUGv2o+XFDJGeOujZjKQ31NPq+VIvhEiPwmALAPsbiiqBKZ1sKukn7lsChRudgg9sC81l9YEqjdU5wlJiDqit41Qu0xhe0SVJpdAGfap9PxbCeRwIDAQAB';

let userData = [];

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
      const res = await axios.get(
        'https://api.twitch.tv/helix/streams?user_login=telefe',
        { headers }
      );
      if (res.status === 200) {
        userData = res.data.data;
        displayData();
      }
    } catch (error) {
      console.log(error);
    }
  }
};

token();

const displayData = () => {
  console.log(userData);
}

// const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem',
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem',
//   },
// });

// // Save the private key to a file
// fs.writeFileSync('private_key.pem', privateKey);

// // Save the public key to a file
// fs.writeFileSync('public_key.pem', publicKey);

// function readPem(filename) {
//   const filePath = path.resolve(__dirname, filename);
  
//   return fs.readFileSync(filePath, 'ascii');
// }

// const digestType = 'RSA-SHA256';
// const privateKey = readPem('private_key.pem');
// const publicKey = readPem('public_key.pem');

// const hmCrypto = HmCrypto(digestType, privateKey, publicKey);

// const message = 'message';

// const signature = hmCrypto.sign(message);

// console.log(`signature for '${message}' is '${signature}'"`);

// const requestBody = {
//   user: '3nYTOSjdlF6UTz9Ir',
//   country: 'XX',
//   currency: 'EUR',
//   operator_id: 1,
//   token: 'cd6bd8560f3bb8f84325152101adeb45',
//   platform: 'GPL_DESKTOP',
//   game_code: 'clt_dragonrising',
//   lang: 'en',
//   lobby_url: 'https://examplecasino.io',
//   ip: '::ffff:10.0.0.39'
// };

app.listen(3000);
