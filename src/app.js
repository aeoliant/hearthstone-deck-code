var decode = require('./decoder');

var encoded = 'AAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=';

var cards = decode(encoded);

console.log(cards);
