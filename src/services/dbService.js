const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, '../../db.json');

function readDB() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbFile, 'utf-8', (err, data) => {
      if (err) reject(err);
      else {
        try {
          const parsedData = JSON.parse(data);
          if (Array.isArray(parsedData)) {
            resolve(parsedData);
          } else {
            reject('Неверная структура данных в базе');
          }
        } catch (parseError) {
          reject('Ошибка при разборе данных');
        }
      }
    });
  });
}

function writeDB(data) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(data)) {
      fs.writeFile(dbFile, JSON.stringify(data, null, 2), (err) => {
        if (err) reject(err);
        else resolve();
      });
    } else {
      reject('Неверная структура данных при записи в базу');
    }
  });
}

module.exports = { readDB, writeDB };
