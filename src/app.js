var decoder = require('./decoder');

var encoded = 'AAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=';

var cards = decoder.decode(encoded);

var otherCards = decoder.encode(cards);

console.log(otherCards);
