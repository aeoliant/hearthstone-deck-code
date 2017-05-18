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
  var codes = decklist.map(x => ({id: dbfid(CARDS.find(card => card.name == x.name).dbfId), copies: x.copies}));

  var singles = codes.filter(x => x.copies == 1).sort((a,b) => a.id - b.id);
  var doubles = codes.filter(x => x.copies == 2).sort((a,b) => a.id - b.id);;

  var length = 5 + 1 + singles.length * 2 + 1 + doubles.length * 2;
  var pad = false;
  if (length % 2 == 1) {
    length++;
    pad = true;
  }
  const buf = Buffer.alloc(length);
  // magic??
  buf[0] = 0;
  buf[1] = 1;
  buf[2] = 2;
  buf[3] = 1;
  buf[4] = 31;
  // end magic
  buf[5] = singles.length;
  for (var i = 0; i < singles.length; i++) {
    buf.writeInt16LE(singles[i].id, 6 + (i * 2));
  }
  buf[6 + (i * 2)] = doubles.length;
  for (var j = 0; j < doubles.length; j++) {
    buf.writeInt16LE(doubles[j].id, 7 + (i * 2) + (j * 2));
  }

  if (pad) {
    buf[buf.length - 1] = 0;
  }

  return buf.toString('base64');
}

// i have no idea what I'm doing
function dbfid(x) {
  const lower7 = 128 | (x % 128);
  var upper = x - lower7;
  upper = upper * 2 + 256

  return upper + lower7;
}

module.exports.decode = decode;
module.exports.encode = encode;
