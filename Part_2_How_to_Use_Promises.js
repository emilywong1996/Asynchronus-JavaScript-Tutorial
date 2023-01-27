// Promise: an object returned by an asyncrhonous function, which represents the current state of the operation.  The promise provides methods to handle the eventual success or failure of the operation.

// The asynchronous function starts the operation and returns a promise object.  Then you can attach handlers to this promise object, and these handlers will be executed when the operation has succeeded or failed.

// Using the fetch() API:

// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// console.log(fetchPromise);

// fetchPromise.then((response) => {
//  console.log(`Received response: ${response.status}`);
// });

//console.log("Started request…");

// The output is:

// Promise { <state>: "pending" }
// Started request…
// Received response: 200

// Started request is logged before receiving response.  fetch() returns while the request is going on, enabling the program to stay responsive.

// Chaining promises:

//  Once you get a response object, you need to call another function to get the response data.  We would call the json() method of the response object.  json() is also asynchronous.

// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// fetchPromise.then((response) => {
//   const jsonPromise = response.json();
//   jsonPromise.then((data) => {
//     console.log(data[0].name);
//   });
// });

// A then() handler was added returned by fetch().  This time, the handler calls response.json(), then passes a new then() handler to the promise returned by response.json().

// This should log "baked beans"

// In the last section, calling a callback inside another callback, we get more nested levels of code, and then it becomes harder?  Isn't this the same?

// then() returns a promise, which will be completed with the result of the function passed to it.  Can rewrite the code like this:

// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// fetchPromise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0].name);
//});

// Instead of calling second then() inside the handler for the first then(), we can return the promise returned by json(), and call the second then() on that return value.

// This is promise chaining, means we can avoid increasing levels of indentation when we need to make consecutive asynchronous function cells.

// We need to check that the server accepted and was able to handle the request, before we try to read it.  We do this by throwing an error if it wasn't OK.

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
});

// Catching errors

// fetch() can throw an error for many reasons, and we are throwing an error ourselves if the server returned an error.

// To support error handling, Promise objects provide a catch() method.  Unlike then(), which the handler passes to then() is called when asynchronous operation succeeds, the handler passes to catch() is called when the asynchronous operation fails.

// If you add catch() to the end of a promise chain, it would be called when any of the asynchronous function calls fails.  You can implement an operation as several consecutive asynchronous function calls, and have a single place to handle all errors.

// Promise terminology

// Promise can be in one of 3 states:

// Pending: the promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet. This is the state your promise is in when it's returned from a call to fetch(), and the request is still being made

// fulfilled: the asynchronous function has succeeded.  When a promise is fulfilled, its then() handler is called.

// rejected: the asynchronous function has failed. When a promise is rejected, its catch() handler is called.

// Sometimes, the term settled cover both fulfilled and rejected

// A promise is resolved if it is settled, or if it has been "locked in" to follow the state of another promise.

// Combining multiple promises

// Sometimes, you need all the promises to be fulfilled, but they don't depend on each other.  Promise.all() method is efficient, it takes an array of promises and returns a single promise.

// The promise returned by Promise.all() is:

// 1. Fulfilled when and if all the promises in the array are fulfilled.  In this case, the then() handler is called with an array of all the response, in the same order that the promises were passed into all().

// 2. Rejected when and if any of the promises in the array are rejected. In this case, the catch() handler is called with the error thrown by the promise that rejected.

// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((responses) => {
//   for (const response of responses) {
//      console.log(`${response.url}: ${response.status}`);
//    }
//  })
//  .catch((error) => {
//    console.error(`Failed to fetch: ${error}`)
//});

// In this example, we're making three fetch() requests to three different URLs.  If they all succeed, we will log the response of each one.  If any of them fail, we're logging the failure.

// output should be:

// https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json: 200
// https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found: 404
// https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json: 200


// If formatted like this: 

// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
//  .then((responses) => {
//    for (const response of responses) {
//      console.log(`${response.url}: ${response.status}`);
//    }
//  })
//  .catch((error) => {
//    console.error(`Failed to fetch: ${error}`)
//});

// Results into:

// Failed to fetch: TypeError: Failed to fetch

// Sometimes, you might need a set of promises to be fulfilled, and don't care which one.  In this case, you want Promise.any()/

// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((response) => {
//     console.log(`${response.url}: ${response.status}`);
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`)
//});

// Note that in this case we can't predict which fetch request will complete first.

// Async and await

// async gives a simpler way to work with asynchronous promise-based code.

// async function myFunction() {
//    // This is an async function
//}

// Inside an async function, you can use await keyword before a call to a function that returns a promise.  This makes the code wait at a point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is thrown.

async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    }
    catch (error) {
      console.error(`Could not get products: ${error}`);
    }
}
  
fetchProducts();

// Here, we are calling await fetch() and instead getting a promise, our caller gets back fully a complete response object, just as if fetch() were a synchronous function.

// We can use try... block error for error handling, like a synchronous function.

async function fetchProducts() {
    try {
      const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
const promise = fetchProducts();
promise.then((data) => console.log(data[0].name));

// Also, you can only use await inside an async function, unless the code is a JavaScript Module.  Can't do this with a normal script.

try {
    // using await outside an async function is only allowed in a module
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data[0].name);
  }
  catch(error) {
    console.error(`Could not get products: ${error}`);
}