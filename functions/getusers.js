const axios = require('axios')
let founddata;
exports.handler = function (event, context, callback) {
  request_data = event['queryStringParameters']
 let name = request_data['name']
  // console.log(name)
  axios.get(name)
  .then(function (response) {
    // handle success
    founddata=response;
    send(founddata);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  const send = (founddata) => {
    callback(null, {
      statusCode: 200,
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Request-With, Content-Type , Accept',
      },
      body: founddata.data,
    })
  }
}