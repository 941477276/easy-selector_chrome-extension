var pluginStatusInTab = {}; // 插件在标签页中的状态
/*
* 点击插件图标时
*/
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTabId = tabs[0].id;
    // alert('当前标签页id：' + currentTabId);
    if(!(currentTabId in pluginStatusInTab) || !pluginStatusInTab[currentTabId]){
      pluginStatusInTab[currentTabId] = true;
      // 调用 injectScript 中的函数
      chrome.tabs.executeScript(tab.id, {code:'init()'});
    }else{
      pluginStatusInTab[currentTabId] = false;
      chrome.tabs.executeScript(tab.id, {code:'destroy()'});
    }
  });
});

// 页面更新事件（有很多情况都会触发，如页面刷新，输入框内容改变）
chrome.tabs.onUpdated.addListener(function (tabId, updateInfo) {
  // alert('页面刷新了！' + tabId + '，状态变更为：' + updateInfo.status);
  if(tabId in pluginStatusInTab){
    pluginStatusInTab[tabId] = false;
  }
});
