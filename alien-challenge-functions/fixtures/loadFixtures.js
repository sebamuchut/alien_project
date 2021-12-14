/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const axios = require('axios');
const DangerMessages = require('./WarningMessages.json');

const basePath = 'http://localhost:3000';

async function callEndpoint(method, url, headers, data) {
  try {
    await axios({
      method, url: `${basePath}${url}`, headers, data
    });
  } catch (e) {
    console.log(`❌ Error calling ${url}:\n \x1b[31m${JSON.stringify(e.response.data.message)}\n\n \x1b[0m`);
  }
}

async function loadMessages() {
  const url = '/store-message';
  const headers = {'content-type': 'text/plain'}
  for (let i = 0; i < DangerMessages.length; i += 1) {
    const message = DangerMessages[i];

    await callEndpoint('post', url, headers, message);
  }
  console.log('\x1b[32m', '✅ messages sent. \x1b[0m');
}

async function loadFixtures() {
  await loadMessages();
}

loadFixtures();
