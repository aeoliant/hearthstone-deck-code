document.addEventListener('DOMContentLoaded', function() {

  var decklist = document.getElementById('decklist');
  var decodeButton = document.getElementById('decode');
  var hide = document.getElementById('hideDeckList');

  hide.addEventListener('click', function() {
    decklist.classList.add('hidden');
    hide.parentNode.classList.add('hidden');
  });

  decodeButton.addEventListener('click', function() {
    var encoded = document.getElementById('encoded').value;

    var decoded = decoder.decode(encoded);

    var ul = document.createElement('ul');
    ul.classList.add('list-unstyled');

    decoded.sort(function(a,b) {
        return a.name.localeCompare(b.name)
      })
      .stableSort(function(a,b) {
        return a.cost - b.cost
      })
      .map(x => {
        if (x.copies == 2) {
          return x.name + ' x 2';
        } else {
          return x.name;
        }
      })
      .forEach(x => {
        var li = document.createElement('li');
        li.textContent = x;
        ul.appendChild(li);
      });

      if (decklist.firstChild) {
        decklist.removeChild(decklist.firstChild);
      }

      decklist.appendChild(ul);
      decklist.classList.remove('hidden');
      hide.parentNode.classList.remove('hidden');
  });

  var encodedDecklist = document.getElementById('encodedDecklist');
  var encodeButton = document.getElementById('encode');
  var hideEncoded = document.getElementById('hideEncodedDeckList');

  hideEncoded.addEventListener('click', function() {
    encodedDecklist.classList.add('hidden');
    hideEncoded.parentNode.classList.add('hidden');
  });

  encodeButton.addEventListener('click', function() {
    var decoded = document.getElementById('decoded').value;

    var encoded = decoder.encode(parseDecklist(decoded));

    var textarea = document.createTextNode(encoded);

    if (encodedDecklist.firstChild) {
      encodedDecklist.removeChild(encodedDecklist.firstChild);
    }

    encodedDecklist.appendChild(textarea);
    encodedDecklist.classList.remove('hidden');
    hideEncoded.parentNode.classList.remove('hidden');
  });
});

function parseDecklist(decoded) {
  var lines = decoded.split('\n');
  return lines.map(line => {
    var double = false;
    if (~line.indexOf(' x 2')) {
      double = true;
      line = line.slice(0, line.indexOf(' x 2'));
    }
    return {
      name: line,
      copies: double ? 2 : 1
    };
  });
}
