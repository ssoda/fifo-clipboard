console.log("hello injected!");

var fifoList = [];

document.addEventListener('copy', (event) => {
  var copiedContent = event.target.value || event.target.textContent;
  if (copiedContent !== "") {
    fifoList.push(copiedContent);
  }
});

document.addEventListener('paste', (event) => {
  event.preventDefault();
  document.execCommand('insertText', false, fifoList.shift());
});