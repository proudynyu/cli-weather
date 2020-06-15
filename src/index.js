#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('../package.json');
const { getToken, saveToken, deleteToken } = require('./utils')

program
  .version(version)
  .description('Get the weather in the <cityName...>')
  .option('-t, --token', 'Advisor ClimaTempo API Token')
  .option('-d, --delete', 'Delete .env Token')
  .option('-s, --show', 'Show token')
  .arguments('<cityName...>')
  .action(async (cityName) => {
    const token = getToken();
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

// http://apiadvisor.climatempo.com.br/doc/index.html