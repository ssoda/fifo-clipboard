console.log("hello injected!");

document.addEventListener('copy', (event) => {
  var copiedContent = event.target.value || event.target.textContent;
  if (copiedContent !== "") {
    chrome.runtime.sendMessage({updateFifoList: {
      type: "copy",
      content: copiedContent,
    }});
  }
});

document.addEventListener('paste', (event) => {
  event.preventDefault();
  chrome.runtime.sendMessage({updateFifoList: {
    type: "paste",
  }}, function(text) {
    if (text) {
      document.execCommand('insertText', false, text);
    }
  });
});
