require('dotenv').config()

const axios = require('axios');
const highlights = require('../highlights.json');

async function main() {
  try {
    const res = await axios({
      url: 'https://readwise.io/api/v2/highlights/',
      method: 'POST',
      data: { highlights: highlights },
      headers: {
        "Authorization": `Token ${process.env.READWISE_TOKEN}`
      }
    });
    console.log(res.status);
  } catch (err) {
    console.error(err);
  }
}

main();
