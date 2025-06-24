document.addEventListener('DOMContentLoaded', () => {
        fetch('../navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav').innerHTML = data;
            });
        });
        
document.getElementById('startBtn').addEventListener('click', () => {
  const input = parseInt(document.getElementById('input').value);
  const primeList = document.getElementById('primeList');
  const nonPrimeList = document.getElementById('nonPrimeList');

  primeList.innerHTML = '';
  nonPrimeList.innerHTML = '';

  if (isNaN(input) || input < 1) {
    alert('Please enter a valid number greater than 0.');
    return;
  }

  for (let i = 1; i <= input; i++) {
    
    const num = document.createElement("li");
    num.value = i;
    
    if (isPrime(i)) {
      primeList.appendChild(num);
    } 
    else {
      nonPrimeList.appendChild(num);
    }
  }
});

function isPrime(num) {
  if (num < 2) return false;
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  
  return true;
}
