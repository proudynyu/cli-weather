const fs = require('fs');
const path = require('path');

require('dotenv').config();

module.exports = {
  getToken() {
    const token = process.env.TOKEN;
    if (!token) return;
    return token;
  },
  saveToken(token) {
    const filePath = path.resolve(__dirname, '..', '..', '.env');
    if (fs.existsSync(filePath)) {
      console.log('.env already exists')
      return
    }
    fs.writeFileSync(filePath, `TOKEN=${token}`);
  },
  deleteToken() {
    const pathFile = path.resolve(__dirname, '..', '..', '.env');
    fs.unlinkSync(pathFile);
  }
}