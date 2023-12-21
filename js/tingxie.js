console.log('祥语插件启动——小美听写');


setTimeout(() => {
  console.log(' 开始统计高亮 ');
  
  heighlightAndCount();
  // listener()
},5000)


function heighlightAndCount() {
  const speakers = document.querySelectorAll('.edit-content-editor-block');
  if (!speakers) {
    console.log('没找到听写内容，直接退出');
    return;
  }
  let speakerCounts = {};
  let speakerSentences = {};


  speakers.forEach(speaker => {
    const spans = speaker.querySelectorAll('.edit-content-editor-text');
    const speakerName = speaker.querySelector('.edit-content-editor-speaker-name')?.textContent.trim() || 'unknown';

    if (!speakerCounts[speakerName]) {
      speakerCounts[speakerName] = 0;
      speakerSentences[speakerName] = 0;

    }
    speakerSentences[speakerName]++;

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

  let report = `报告URL: ${window.location.href}\n`;
  report += `共记录了 ${document.querySelectorAll('.highlight').length/2} 个 '然后'\n`
  report += `详细数据如下：\n\n`;

  report += '说话人\t平均每段"然后"数\t"然后"个数\t说话段数\n';

  let maxThenCount = 0;
  let maxSpeaker = '';
  let maxAverage = 0

  for (const speaker in speakerCounts) {
      if(!speaker || speaker=='unknown'){continue}
      let average = (speakerCounts[speaker] / speakerSentences[speaker]).toFixed(2);
      let sentenceCount = speakerSentences[speaker].toString();
      let count = speakerCounts[speaker].toString();

      report += speaker.padEnd(10); // 假设"说话人"字段最宽10个字符
      report += average.padEnd(15); // 假设"平均每段'然后'"字段最宽15个字符
      report += count.padEnd(15); // 假设"'然后'个数"字段最宽10个字符
      report += sentenceCount.padEnd(10); // 假设"说话段数"字段最宽10个字符
      report += '\n';

      if (count > maxThenCount) {
        maxThenCount = count;
        maxSpeaker = speaker;
        maxAverage = average;
      }
  }
  
  report += `\n\n"然后”冠军是：${maxSpeaker},说了 ${maxThenCount} 次"然后",平均每段话 ${maxAverage} 个"然后"`
  
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




  