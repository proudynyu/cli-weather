#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');
const readLine = require('readline');
const { getToken, saveToken, deleteToken } = require('./utils')
const { getCityByName, registerCity } = require('./services/utils');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

program
  .version(version)
  .description('Get the weather in the <cityName...>')
  .option('-t, --token', 'Advisor ClimaTempo API Token')
  .option('-d, --delete', 'Delete .env Token')
  .option('-s, --show', 'Show token')
  .option('-g, --get', 'Get weather')
  .arguments('[cityName...]')
  .action(async (cityName) => {
    if (!cityName) process.exit(1);
    const token = getToken();
    try {
      const data = await getCityByName(cityName, token);
      
      rl.question(`Do you wanna register ${data.name}:${data.id}? (y/n)  `, async (anw) => {
        if (anw === 'y' || anw === 'Y') {
          const register = await registerCity(data.id, token);
          console.log(register.data);
        };
        rl.close();
      })
    } catch (err) {
      console.log(err);
    }
  })
  .parse(process.argv);

if (program.token) {
  const indexToken = process.argv.indexOf('--token') < 0 ? 
    process.argv.indexOf('-t') : 
    process.argv.indexOf('--token');
  const token = process.argv.splice(indexToken + 1).join();
  console.log('Saving your token')
  saveToken(token);
}

if (program.show) {
  const token = getToken();
  console.log(token);
}

if (program.delete) {
  console.log('Deleting .env')
  deleteToken(); 
}

if (program.get) {

}

// http://apiadvisor.climatempo.com.br/doc/index.html