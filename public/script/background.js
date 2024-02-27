// 监听窗口关闭事件
chrome.windows.onRemoved.addListener(function (windowId) {
  // 获取当前所有窗口
  chrome.windows.getAll(function (windows) {
    // 如果没有其他窗口存在
    if (windows.length === 0) {
      // 清除localStorage缓存
      localStorage.removeItem("activePage");
      console.log("localStorage缓存已清除");
    }
  });
});
