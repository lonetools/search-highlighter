chrome.runtime.onStartup.addListener(() => {
    chrome.scripting.registerContentScript({
      id: 'content-script',
      matches: ['http://*/*', 'https://*/*'],
      js: [{file: 'content.js'}],
      runAt: 'document_idle'
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.message === 'word_updated') {
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['content.js']
      }).then(() => {
        console.log("Script executed successfully");
      }).catch(err => console.error(err));
    }
  });
  
  