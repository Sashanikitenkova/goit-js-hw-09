import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import '../css/common.css';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');

const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

let intervalId = null;
startBtn.disabled = true;


const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        if (selectedDates[0] > new Date()) {
           startBtn.disabled = false;
        } else {
           startBtn.disabled = true;
           Notify.failure("Please choose a date in the future");
        }
      },
    };
  
  let fp = flatpickr(inputEl, options); 

  startBtn.addEventListener("click", () => {
           intervalId = setInterval(() => {
            const ms = fp.selectedDates[0].getTime() - new Date().getTime();
            console.log(ms);

            if (ms < 0) {
              startBtn.disabled = true;
              clearInterval(intervalId);
            } else {
              console.log(ms);
              const time = convertMs(ms);
              updateClockface(time);
              console.log('time', time);
              console.log('ms', ms);
            }
          }, 1000);
         });

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  };

  function updateClockface ({ days, hours, minutes, seconds }) {
    spanDays.textContent = `${days}`
    spanHours.textContent = `${hours}`
    spanMinutes.textContent = `${minutes}`
    spanSeconds.textContent = `${seconds}`
  };

  





  
  