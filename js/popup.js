// popup.js
// document.addEventListener('DOMContentLoaded', () => {
//   // 从背景页或内容脚本获取统计总数
//   chrome.runtime.sendMessage({ type: "getCount" }, function (response) {
//       // 更新 popup.html 中的计数器显示
//       if (response && response.count !== undefined) {
//           document.getElementById('countDisplay').textContent = '总数：' + response.count;
//       }
//   });
// });

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "updateCount") {
      // 更新显示的总数
      document.getElementById('countDisplay').textContent = '总数：' + message.count;
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('triggerButton');
  button.addEventListener('click', () => {
    console.log('点击了');
    
      // 向内容脚本发送消息
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: triggerTingxieFunction
          });
      });
  });
});

// 此函数将在内容脚本环境中执行
function triggerTingxieFunction() {
  // 发送消息到 tingxie.js
  chrome.runtime.sendMessage({ type: "triggerAction" });
}