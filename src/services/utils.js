const api = require('./config');
const axios = require('axios')

module.exports = {
  async getCityByName(cityName, token) {
    try {
      const request = await api.get(`locale/city?name=${cityName}&token=${token}`);
      return {
        id: request.data[0].id,
        name: request.data[0].name,
        state: request.data[0].state,
        country: request.data[0].country
      };
    } catch (err) {
      console.log(err);
    }
  },

  async getCityForecast(cityId, token) {
    try {
      const request = await api.get(`forecast/locale/${cityId}/hours/72?token=${token}`);
      console.log(request.data);
    } catch (err) {
      console.log(err);
    }    
  },

  async registerCity(cityId, token) {
    try {
      const register = await axios
        .put(`http://apiadvisor.climatempo.com.br/api-manager/user-token/${token}/locales`, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: `localeId[]=${cityId}`
        });
      console.log(register);
    } catch (err) {
      console.log(err);
    }
  }
}