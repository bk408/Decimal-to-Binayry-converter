const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Function to calculate the binary representation and generate animation data dynamically
const generateAnimationData = (input) => {
  const animationData = [];
  let currentInput = input;
  let delay = 1000; // Initial delay

  // Generate stack frames until the base case is reached
  while (currentInput > 1) {
    animationData.push({
      inputVal: currentInput,
      addElDelay: delay,
      msg: `decimalToBinary(${currentInput}) returns "${Math.floor(
        currentInput / 2
      ).toString(2)}" + ${
        currentInput % 2
      } (${currentInput} % 2). Then it pops off the stack.`,
      showMsgDelay: delay + 5000,
      removeElDelay: delay + 10000,
    });
    currentInput = Math.floor(currentInput / 2);
    delay += 1500; // Increment delay for each frame
  }

  // Add base case
  animationData.push({
    inputVal: currentInput,
    addElDelay: delay,
    msg: `decimalToBinary(${currentInput}) returns '${currentInput}' (base case). Then it pops off the stack.`,
    showMsgDelay: delay + 5000,
    removeElDelay: delay + 10000,
  });

  return animationData.reverse(); // Reverse to show stack from base case upwards
};

// Function to perform the conversion and animate the call stack
const showAnimation = (input) => {
  result.innerText = "Call Stack Animation";

  const animationData = generateAnimationData(input);

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="frame-${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(`frame-${obj.inputVal}`).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      const element = document.getElementById(`frame-${obj.inputVal}`);
      if (element) element.remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
    result.textContent = `Binary: ${decimalToBinary(input)}`;
  }, animationData[animationData.length - 1].removeElDelay + 1000);
};

// Recursive function to convert decimal to binary
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Check user input and trigger animation or direct conversion
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  // Clear previous animations
  animationContainer.innerHTML = "";

  // Trigger animation with user input
  showAnimation(inputInt);
  numberInput.value = "";
};

// Event listeners for button click and "Enter" key
convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
