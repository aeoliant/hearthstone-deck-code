document.addEventListener('DOMContentLoaded', function() {

  var decodeButton = document.getElementById('decode');

  decodeButton.addEventListener('click', function() {
    var decklist = document.getElementById('decklist');
    var encoded = document.getElementById('encoded').value;

    var decoded = decoder.decode(encoded);

    var ul = document.createElement('ul');
    ul.classList.add('list-unstyled');

    decklist.textContent = decoded.sort(function(a,b) {
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
  });
});
