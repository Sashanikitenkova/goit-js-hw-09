import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button');

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const formElements = evt.currentTarget.elements;

  const delayIn = Number(formElements.delay.value);
  const stepIn = Number(formElements.step.value);
  const amountIn = Number(formElements.amount.value);

  let position = 0;
  let delay = delayIn;
  
  for (let i = 0; i < amountIn; i++) {

      function createPromise(position, delay) {
          return new Promise((resolve, reject) => {
            const shouldResolve = Math.random() > 0.3;
  
            setTimeout(() => {
               if (shouldResolve) {
                  resolve({ position, delay }) 
               } else {
                  reject({ position, delay })
               };
            }, delay);
          });
        };

        position +=1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
           Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon:false });
      })
      .catch(({ position, delay }) => {
           Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon:false });
      });

      delay += stepIn;
  };     
};




// for (let i = 0; i < amountIn; i++) {

//   function createPromise(position, delay) {
//       return new Promise((resolve, reject) => {
//         const shouldResolve = Math.random() > 0.3;

//         setTimeout(() => {
//            if (shouldResolve) {
//               resolve({ position, delay }) 
//            } else {
//               reject({ position, delay })
//            };
//         }, delay);
//       });
//     };

//     position +=1;
//     delay += stepIn;

// createPromise(position, delayIn)
//   .then(({ position, delay }) => {
//        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
// };     










