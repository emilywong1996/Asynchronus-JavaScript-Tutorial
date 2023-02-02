const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
];
  
const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
}
  
const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

function aliceA(){
  setTimeout(()=>{
    alice1.animate(aliceTumbling, aliceTiming);
  },0)
}

function aliceB(){
  setTimeout(()=>{
    alice2.animate(aliceTumbling, aliceTiming);
  },2000)
}

function aliceC(){
  setTimeout(()=>{
    alice3.animate(aliceTumbling, aliceTiming);
  },4000)
}

aliceA();
aliceB();
aliceC();