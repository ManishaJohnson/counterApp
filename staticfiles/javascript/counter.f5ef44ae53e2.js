// Get the count element
var countElement = document.getElementById('count');

// Set the initial count
var count = parseInt(countElement.innerText);

// Function to increment the count
function incrementCount() {
  count++;
  countElement.innerText = count;
}

// Function to decrement the count
function decrementCount() {
  if (count > 0) {
    count--;
    countElement.innerText = count;
  }
}

// Add event listeners to the buttons
document.getElementById('increment-btn').addEventListener('click', incrementCount);
document.getElementById('decrement-btn').addEventListener('click', decrementCount);
