document.getElementById('word').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      submitWord();
    }
  });
  
  document.getElementById('submit').onclick = submitWord;
  
  function submitWord() {
    var word = document.getElementById('word').value;
    chrome.storage.sync.set({ 'highlight_word': word }, function() {
      console.log('Value is set to ' + word);
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.runtime.sendMessage({"message": "word_updated", "tabId": activeTab.id});
      });
    });
  }
  
  