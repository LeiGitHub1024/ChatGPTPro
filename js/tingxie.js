console.log('祥语插件启动——小美听写');


setTimeout(() => {
  console.log(' 开始统计高亮 ');
  
  heighlightAndCount();
  // listener()
},5000)


function heighlightAndCount() {
  const speakers = document.querySelectorAll('.edit-content-editor-block');
  let speakerCounts = {};

  speakers.forEach(speaker => {
    const spans = speaker.querySelectorAll('.edit-content-editor-text');
    const speakerName = speaker.querySelector('.edit-content-editor-speaker-name').textContent.trim();

    if (!speakerCounts[speakerName]) {
      speakerCounts[speakerName] = 0;
    }

    for (let i = 0; i < spans.length - 1; i++) {
      const combinedText = spans[i].textContent + spans[i + 1].textContent;
      if (combinedText === '然后') {
        spans[i].classList.add('highlight');
        spans[i + 1].classList.add('highlight');
        speakerCounts[speakerName]++;
      }
    }
  });

  addHeighlightStyle();

  // 新增：生成报告并下载
  let report = `报告URL: ${window.location.href}\n`;
  report += `共记录了 ${document.querySelectorAll('.highlight').length/2} 个 '然后'\n`
  report += `详细数据如下：\n\n`

  for (const speaker in speakerCounts) {
    report += `${speaker}: '然后' 出现次数: ${speakerCounts[speaker]}\n`;
  }
  if (document.querySelectorAll('.highlight').length / 2 == 0) {
    return 
  }
  generateAndDownloadReport(report);

}

function addHeighlightStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
    .highlight {
        background-color: yellow;
        font-weight: bold;
    }
`;
  document.head.appendChild(style);
}

function generateAndDownloadReport(report) {
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "speaker_report.txt";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}


// function listener() {
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "triggerAction") {
//         // 在这里执行您想要的操作
//         console.log("Button in popup triggered action in tingxie.js");
//     }
//   });
// }




  