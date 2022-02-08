const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
let promptCounter = 0;


startBtn.addEventListener("click", () => {
        timerId = setInterval(() => {
        document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        promptCounter +=1;

        if(promptCounter === 1) { 
            startBtn.disabled = true;
            promptCounter = 0; }
        }, 1000);
        
      });
  
  
  stopBtn.addEventListener("click", () => {
        clearInterval(timerId);
        startBtn.disabled = false;
  });



