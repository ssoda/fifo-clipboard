console.log("hello injected!");

var fifoList = [];

document.addEventListener('copy', (event) => {
  fifoList.push(event.target.value);
});

document.addEventListener('paste', (event) => {
  event.preventDefault();
  document.execCommand('insertText', false, fifoList.shift());
});