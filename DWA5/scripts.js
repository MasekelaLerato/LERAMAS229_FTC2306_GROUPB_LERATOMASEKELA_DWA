const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  
  //used a if and else statement to check whether either of the input fields (dividend or divider) is empty before performing the division. If either of them is empty, it displays the error message
  if(dividend === '' || divider === ''){
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
  }  
  // added an else if statement that will throw an error when nin-numeric values are entered
   if(isNaN(dividend) && isNaN(divider)){
    display.error("Something critical went wrong. Please reload the page")
    console.log('Invalid input')
  } 
  // added an else if statement that will check if the diver is less than zero
  else if (divider < 0) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error("Error: Invalid number provided");
  } else{
  //used math.floor to ensure that there are no decimal places in th output
  result.innerText = Math.floor(dividend / divider);
  }
 
});

