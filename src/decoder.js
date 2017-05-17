const CARDS = require('./cards');

function decode(encoded) {
  const buf = new Buffer(encoded, 'base64');

  const cards = [];

  const single = 5; // assume header is fixed at 5
  const numSingleCards = buf[single];
  for (var i = 1; i <= numSingleCards * 2; i += 2) {
    cards.push({id: buf.readInt16LE(single + i), copies: 1});
  }

  const double = single + i;
  const numDoubleCards = buf[double];
  for (var i = 1; i <= numDoubleCards * 2; i += 2) {
    cards.push({id: buf.readInt16LE(double + i), copies: 2 });
  }

  const ids = cards.map(x => ({id: ((x.id >> 8) << 7 | (x.id % 128)), copies: x.copies}));

  return ids.map(id => {
    var card = CARDS.find(card => card.dbfId == id.id);
    card.copies = id.copies;
    return card;
  });
}

function encode(decklist) {
  var codes = decklist.map(x => CARDS.find(card => card.name == x.name));
}

module.exports.decode = decode;
module.exports.encode = encode;
