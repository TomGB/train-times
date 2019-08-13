require('dotenv')

var ukTrains = require('uk-trains');
var rail = ukTrains(process.env.TRAIN_KEY)

const getDepartures = (a, b) => new Promise(resolve => rail.getDepartures(a, b, resolve))

const handler = async ({ queryStringParameters: { from = 'LDS', to = 'HDY' } }) => {
  try {
    const trains = await getDepartures(from, { toStation: to })

    return { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' }, body: JSON.stringify(trains) }
  } catch (e) {
    console.log('in error', e)
  }
}

module.exports = { handler }
