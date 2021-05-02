let color = '#3aa757';
let fifoMap = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ fifoMap });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, cb) {
    if (!request.updateFifoList || !request.updateFifoList.type) {
      return;
    }

    if (request.updateFifoList.type === "copy") {
      if (!fifoMap[sender.tab.id]) {
        fifoMap[sender.tab.id] = [];
        return;
      }

      if (!request.updateFifoList.content) {
        return;
      }

      fifoMap[sender.tab.id].push(request.updateFifoList.content);
      var tabFifoListLength = fifoMap[sender.tab.id].length;
      chrome.action.setBadgeText({tabId: sender.tab.id, text: `${tabFifoListLength}`});
    }

    if (request.updateFifoList.type === "paste") {
      if (!fifoMap[sender.tab.id]) {
        fifoMap[sender.tab.id] = [];
      }

      if (fifoMap[sender.tab.id].length === 0) {
        chrome.action.setBadgeText({tabId: sender.tab.id, text: "0"});
        return cb();
      }

      var content = fifoMap[sender.tab.id].shift();
      var tabFifoListLength = fifoMap[sender.tab.id].length;
      chrome.action.setBadgeText({tabId: sender.tab.id, text: `${tabFifoListLength}`});
      return cb(content);
    }
  }
);
