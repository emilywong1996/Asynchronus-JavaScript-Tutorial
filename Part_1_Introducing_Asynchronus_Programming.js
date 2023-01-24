// What is the primary difference between synchronous and asynchronous programming in JavaScript?
// Why is this useful?
// What problems does it solve?

// Asynchronous programing is a technique that enables your program to start a potentially long running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. 
// Some examples: Making HTTP requests using fetch(), accessing user's camera or microphone using getUserMedia(), and asking a user to select files using showOpenFilePicker()

// Synchronous Programming:

// const name = 'Miriam';
// const greeting = `Hello, my name is ${name}!`;
// console.log(greeting);

// "Hello, my name is Miriam!"

// The code declares a string called name
// Declares another string called greeting, which uses name
// Outputs the greeting to the JavaScript console.

// The browser effectively steps through the program one line at a time, in the order we wrote it.

// Synchronous program is when code effectively steps through the program one at a time, in the order we wrote it, before going onto the next line.  Each line depends on the work done in the preceding lines.

// Synchronous programming:
function makeGreeting(name) {
    return `Hello, my name is ${name}!`;
}

const name = 'Miriam';
const greeting = makeGreeting(name);
console.log(greeting);
// "Hello, my name is Miriam!"

// A long-running synchronous function

// This code below is inefficient:

// <label for="quota">Number of primes:</label>
// <input type="text" id="quota" name="quota" value="1000000" />

// <button id="generate">Generate primes</button>
// <button id="reload">Reload</button>

// <div id="output"></div>

const MAX_PRIME = 1000000;

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}

const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const quota = document.querySelector('#quota');
const output = document.querySelector('#output');

document.querySelector('#generate').addEventListener('click', () => {
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota.value} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.location.reload();
});

// This function takes several seconds to finish generating primes
// The issue: when generatePrimes() function is running, the program is completely unresponsive, can't type, click, or do anything else.

// We need to:
// 1. Start a long-running operation by calling a function
// 2. Have that function start the operation and return immediately, so that the program can still be responsive to other events
// 3. Notify us with the result of the operation when it eventually completes.

// Event handlers

// XMLHttpRequest API enables to make HTTP requests to a remote server using JavaScript.  Since it can take a long time, it's an asynchronous API, and get notified about the progress
// Example:

// <button id="xhr">Click to start request</button>
// <button id="reload">Reload</button>

// <pre readonly class="event-log"></pre>

const log = document.querySelector('.event-log');

document.querySelector('#xhr').addEventListener('click', () => {
  log.textContent = '';

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('loadend', () => {
    log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
  });

  xhr.open('GET', 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json');
  xhr.send();
  log.textContent = `${log.textContent}Started XHR request\n`;});

document.querySelector('#reload').addEventListener('click', () => {
  log.textContent = '';
  document.location.reload();
});

// This is an example of the event handlers, except that the event being a user action, such as clicking a button, the event is a change in the state of some object

// Callbacks

// Callbacks are a function that's passed into another function, with the exception that the call back will be called at the appropriate time.  Callbacks used to be the main way asynchronous functions were implemented in JavaScript.

// Example:

function doStep1(init) {
    return init + 1;
}
  
function doStep2(init) {
    return init + 2;
}
  
function doStep3(init) {
    return init + 3;
}
  
function doOperation() {
    let result = 0;
    result = doStep1(result);
    result = doStep2(result);
    result = doStep3(result);
    console.log(`result: ${result}`);
}
  
doOperation();

// The first step adds 1 to the input, the second adds 2, the third adds 3.  Starting with 0, the end result is 6.  If using callbacks, it'll look like this:

function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
}
  
function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
}
  
function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
}
  
function doOperation() {
    doStep1(0, (result1) => {
      doStep2(result1, (result2) => {
        doStep3(result2, (result3) => {
          console.log(`result: ${result3}`);
        });
      });
    });
}
  
doOperation();

//  It'll become a deeply nested doOperation(), it can be hard to handle errors.

// Most modern asynchronous API's don't use callbacks.  Instead, they use Promise.