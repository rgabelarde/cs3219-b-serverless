'use strict';

const axios = require('axios');

async function fetchApiData() {
  let dateToday = new Date();
  const offset = dateToday.getTimezoneOffset()
  dateToday = new Date(dateToday.getTime() - (offset * 60 * 1000))
  console.log(dateToday);
  const apiResponse = await axios.get(
    'https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=' + dateToday.toISOString().split('T')[0]
  );
  console.log("Request sent to the API");
  return apiResponse.data.items;
}

module.exports.getWeatherRecTmr = async (event) => {
  const res = await fetchApiData();
  if (res[0].forecasts[0].forecast.includes("showers")) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Looks like it will rain tomorrow, remember to take an umbrella with you.",
          input: event,
        },
        null,
        2
      ),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Looks like it will be cloudy or sunning tomorrow, enjoy your day outdoors!",
          input: event,
        },
        null,
        2
      ),
    };
  }
};
