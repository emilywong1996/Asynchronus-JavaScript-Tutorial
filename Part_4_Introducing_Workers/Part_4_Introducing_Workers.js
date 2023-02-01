// Introducing Workers

// Thread: a sequence of instructions that a program follows.

// Single thread: It can only do one thing at a time, so if it's waiting for the long-running synchronous call to return, it can't do anything else.

// Workers give the ability to run tasks in a different thread, so you can start the task, then continue with other processing.

// With multithreaded code, you never know when your thread will be suspended and the other thread will get a chance to run.  So if both threads have access to the same variables, it's possible for a variable to change unexpectedly at any time, and this causes bugs that are hard to find.

// To avoid the problem, the main code and worker code never get direct access to each other's variables. Workers and main code run in completely separate worlds, and only interact by sending each other messages.

// There are 3 different sorts of workers:

// 1) dedicated workers

// 2) shared workers

// 3) service workers

// Using web workers

function generatePrimes(quota) {

    function isPrime(n) {
      for (let c = 2; c <= Math.sqrt(n); ++c) {
        if (n % c === 0) {
            return false;
         }
      }
      return true;
    }
  
    const primes = [];
    const maximum = 1000000;
  
    while (primes.length < quota) {
      const candidate = Math.floor(Math.random() * (maximum + 1));
      if (isPrime(candidate)) {
        primes.push(candidate);
      }
    }
  
    return primes;
  }
  
  document.querySelector('#generate').addEventListener('click', () => {
    const quota = document.querySelector('#quota').value;
    const primes = generatePrimes(quota);
    document.querySelector('#output').textContent = `Finished generating ${quota} primes!`;
  });
  
  document.querySelector('#reload').addEventListener('click', () => {
    document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
    document.location.reload();
});

// After generatePrimes(), the program becomes unresponsive.

// We're creating the worker using the Worker() constructor.  We pass a URL pointing to the worker script.  As soon as the work is created, the worker script is executed.

// Next, we add a click event handler to "Generate primes" button.  Rather than calling a generate Primes() function, we send a message to the worker using worker.postMessage().  This message can take an argument, passing a JSON object containing two properties.

// Command: a string identifying the thing we want the worker to do

// Quota: the number of primes to generate

// Next, we add a message event handler to the worker.  This is so the worker can tell when it has finished, and pass us any resulting data. Our handler takes the data from the data property of the message, and writes it to the output element.

// Finally, we implement the click event handler for the "Reload" button, this is the same as the synchronous version.

// The generate.js runs as soon as the main script creates the worker.

// The first thing the worker does is tart listening for messages from the main script. It does this using addEventListener(), which is a global function in a worker. Inside the message event handler, the data property of the event contains a copy of the argument passed from the main script.

// If the main script passed the generate command, we call generatePrimes(), passing in the quota value from the message event.

// The generatePrimes() function is like the synchronous version, except instead of returning a value, we send a message to the main script when we are done.  We use postMessage() function for this, which like addEventListener(), is a global function in a worker.

// Other types of workers:

// Shared workers: can be shared by several different scripts running in different windows

// Service workers: act like proxy servers, caching resources so that web applications can work when the user is offline. They're a key component of Progressive Web Apps.
