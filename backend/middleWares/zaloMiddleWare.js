const axios = require('axios');

let data = JSON.stringify({
    recipient: {
        user_id: '2512523625412515',
    },
    message: {
        text: 'hello, world!',
    },
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://openapi.zalo.me/v3.0/oa/message/cs',
    headers: {
        'Content-Type': 'application/json',
        access_token: '<your_access_token>',
    },
    data: data,
};

axios
    .request(config)
    .then(response => {
        console.log(JSON.stringify(response.data));
    })
    .catch(error => {
        console.log(error);
    });
