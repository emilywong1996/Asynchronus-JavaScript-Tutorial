// Implementing an alarm() API

// We will use setTimeout() API to implement the alarm() function. The setTimeout() API takes as arguments as a callback function and a delay, given in milliseconds.

// When setTImeout() is called, it starts a timer set to the given delay, and when the time expires, it calls the given function.

// <button id="set-alarm">Set alarm</button>
// <div id="output"></div>

// const output = document.querySelector('#output');
// const button = document.querySelector('#set-alarm');

// function setAlarm() {
//    setTimeout(() => {
//    output.textContent = 'Wake up!';
//    }, 1000);
// }

// button.addEventListener('click', setAlarm);

// The Promise() constructor

// The alarm() function will return a Promise that is fulfilled when the timer expires.  It will pass "Wake up!" into the then() handler, and reject the promise if the caller supplies a negative delay value.

// The Promise() constructor takes a single function as an argument. It's called the executor.

// The executor function takes two arguments, which are both also functions, and which are called resolve and reject.  In the executor implementation, you cal the underlying asynchronous function.  If the asynchronous function succeeds, you call resolve, if it fails, you call reject.

// If the executor throws an error, reject is called automatically.

// function alarm(person, delay) {
//     return new Promise((resolve, reject) => {
//       if (delay < 0) {
//         throw new Error('Alarm delay must not be negative');
//       }
//       setTimeout(() => {
//         resolve(`Wake up, ${person}!`);
//       }, delay);
//     });
// }

// the function creates and returns a new Promise.  Inside the executor for the promise, it

// 1) Check that delay is not negative, and throw an error if it is.

// 2) Call setTimeout(), passing a callback and delay.  The callback will be called when the timer expires, and in the callback we call resolve, passing in "Wake up!" message.

// Using the alarm() API

// const name = document.querySelector('#name');
// const delay = document.querySelector('#delay');
// const button = document.querySelector('#set-alarm');
// const output = document.querySelector('#output');

// function alarm(person, delay) {
//   return new Promise((resolve, reject) => {
//     if (delay < 0) {
//       throw new Error('Alarm delay must not be negative');
//     }
//     setTimeout(() => {
//       resolve(`Wake up, ${person}!`);
//     }, delay);
//   });
// }

// button.addEventListener('click', () => {
//   alarm(name.value, delay.value)
//     .then((message) => output.textContent = message)
//     .catch((error) => output.textContent = `Couldn't set alarm: ${error}`);
// });

// Using async and await with the alarm() API

// const name = document.querySelector('#name');
// const delay = document.querySelector('#delay');
// const button = document.querySelector('#set-alarm');
// const output = document.querySelector('#output');

// function alarm(person, delay) {
//   return new Promise((resolve, reject) => {
//     if (delay < 0) {
//       throw new Error('Alarm delay must not be negative');
//     }
//     setTimeout(() => {
//       resolve(`Wake up, ${person}!`);
//     }, delay);
//   });
// }

// button.addEventListener('click', async () => {
//   try {
//     const message = await alarm(name.value, delay.value);
//     output.textContent = message;
//   }
//   catch (error) {
//     output.textContent = `Couldn't set alarm: ${error}`;
//   }
// });