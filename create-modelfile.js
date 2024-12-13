import fs from 'fs';
import * as cheerio from 'cheerio';

const titleSelector = 'article h2:first-of-type';
const contentSelector = 'div[class=post--content]';

const out = fs.createWriteStream('Modelfile');

const forAllLines = async (filename, callback) => {
  fs.readFileSync(filename, 'utf8').split('\n').forEach(line => {
    callback(line);
  })
}

const cleanText = text => {
  return text.replace(/[\r\n]/g, ' ').replace(/\s+/g, ' ');
}

const urlToModel = async url => {
  if(url.indexOf('http') < 0) {
    return;
  }
  let res;
  try {
    res = await fetch(url);
  } catch(err) {
    console.error(err);
    return;
  }
  
  console.log('fetched', url);
  if (res.status != 200) {
    throw (`Got HTTP status ${res.status} fetching ${url}`);
  }
  const $ = cheerio.load(await res.text());
  await out.write(`MESSAGE user what do you know about '${cleanText($(titleSelector).text())}'?\n`);
  await out.write(`MESSAGE assistant ${cleanText($(contentSelector).text())}\n`);
}

await forAllLines('modelhead.txt', line => out.write(`${line}\n`));
await forAllLines('urls.txt', urlToModel);