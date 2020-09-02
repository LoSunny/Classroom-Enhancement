chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.greeting == 'download') {
    chrome.downloads.download({
      url: `https://drive.google.com/uc?authuser=${request.authuser}&id=${request.fileID}&export=download`,
      filename: request.name,
    }, downloadId => {
      sendResponse({
        response: true
      });
    });
    return true;
  }
});
