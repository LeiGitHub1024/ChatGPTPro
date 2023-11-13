// 确保文档加载完毕
console.log('1');

  console.log('2');
  
  let lastMessage = '';
  // 获取ID为'prompt-textarea'的textarea元素
  const textarea = document.getElementById('prompt-textarea');

  // 检查textarea是否存在
  if (textarea) {
      // 为textarea添加input事件监听器
      textarea.addEventListener('input', function() {
          // 当textarea的内容改变时，打印出其内容
        console.log('Textarea内容变化:', textarea.value);
        lastMessage = textarea.value;
        
      });
  } else {
      console.error('未找到ID为 prompt-textarea 的元素');
  }


  const targetDiv = document.querySelector('div.group.fixed.bottom-3.right-3.z-10.hidden.gap-1.lg\\:flex');
    if (targetDiv) {
        // 创建一个新按钮
        const newButton = document.createElement('button');
        newButton.innerText = '🐒';
      newButton.style.marginRight = '10px';
      newButton.style.marginBottom = '10px';

        // 为新按钮添加事件监听器（根据需要）
        newButton.addEventListener('click', function() {
             // 使用navigator.clipboard API复制消息到剪贴板
          navigator.clipboard.writeText(lastMessage).then(() => {
              console.log('消息已复制到剪贴板');
          }).catch(err => {
              console.error('无法复制消息:', err);
          });
        });

        // 将新按钮添加到div中
        targetDiv.appendChild(newButton);
    } else {
        console.error('未找到指定的div元素');
    }