var rxLookfor = /(?:linkedin\.com\/jobs\/search\/)/;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (rxLookfor.test(changeInfo.url)) {
        chrome.tabs.sendMessage(tabId, 'url-update');
    }
});
