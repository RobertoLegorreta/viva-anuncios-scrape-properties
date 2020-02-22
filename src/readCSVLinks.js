const fs = require('fs'); 
const csv = require('csv-parser');
const awaitReadStream = require('await-stream-ready').read;

module.exports = async() => {
  let links = [];
  let i = 0;

  const stream = fs.createReadStream('../get-links/data/links.csv'); 
  stream.pipe(csv()).on('data', function(data){
      links[i] = data.LINKS; 
      i++; 
  })

  await awaitReadStream(stream);
  console.log('🚀🚀 END UP READING LINKS FILE');
  return links; 
} 

