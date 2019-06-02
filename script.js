function loadJSON(callback) {
  chrome.storage.sync.get({
    selectedLevel: 'N3'
  }, function (items) {
    level = document.getElementById('level').value = items.selectedLevel;
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/' + level + '.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  });
}

function init() {
  loadJSON(function (response) {
    // Parse JSON string into object
    var word_data = JSON.parse(response);
    num = Math.floor(Math.random() * word_data.length);
    // generate sentence
    sentence = ''
    for (var i in word_data[num]["Japanese"]) {
      for (var j in word_data[num]["Japanese"][i]) {
        sentence += j + '<rt>' + word_data[num]["Japanese"][i][j] + '</rt>';
      }
    }
    sentence = '<ruby>' + sentence + '</ruby>'
    // generate vocab
    vocab = ''
    for (var i in word_data[num]["Vocab"]) {
      for (var j in word_data[num]["Vocab"][i]) {
        vocab += j + '<rt>' + word_data[num]["Vocab"][i][j] + '</rt>';
      }
    }

    vocab = '<ruby>' + vocab + '</ruby>'
    $("#vocab").html(vocab);
    $("#meaning").html(word_data[num]["Meaning"]);
    $("#japanese").html(sentence);
    $("#english").html(word_data[num]["English"]);
  });
}

window.onload = init;