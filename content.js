var word;


function updateWord() {
  // remove old highlights
  Array.from(document.querySelectorAll('mark')).forEach(mark => {
    var parent = mark.parentNode;
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
  });

  // get new word and apply highlights
  chrome.storage.sync.get(['highlight_word'], function(result) {
    console.log('Value currently is ' + result.highlight_word);
    word = result.highlight_word;
    highlightWord(word);
  });
}

updateWord();

function highlightWord(word) {
  if (!word) return;
  const regex = new RegExp(`\\b${word}\\b`, 'gi');

  function highlight(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentNode && node.parentNode.nodeName !== 'MARK' && regex.test(node.textContent)) {
        const temp = document.createElement('div');
        temp.innerHTML = node.textContent.replace(regex, (match) => `<mark>${match}</mark>`);
        while (temp.firstChild) {
          node.parentNode.insertBefore(temp.firstChild, node);
        }
        node.parentNode.removeChild(node);
      }
    } else {
      for(let i = 0; i < node.childNodes.length; i++) {
        highlight(node.childNodes[i]);
      }
    }
  }

  highlight(document.body);
}

