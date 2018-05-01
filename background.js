var previousURL = "";
var rxLookfor = /(?:linkedin\.com\/jobs\/search\/)/;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === 'complete' && rxLookfor.test(previousURL)){
    	previousURL = "";
    	chrome.tabs.sendMessage(tabId, 'url-update');
    } else if (rxLookfor.test(changeInfo.url)) {
        previousURL = changeInfo.url;
    }
});
// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
//     chrome.tabs.executeScript(null,{file:"contents.js"});
// });