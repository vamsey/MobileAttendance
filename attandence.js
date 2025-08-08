document.addEventListener("DOMContentLoaded", function () {
  const attendedInput = document.querySelector(".inp1");
  const conductedInput = document.querySelector(".inp2");
  const requiredInput = document.querySelector(".inp3");
  const display = document.querySelector(".display");
  const calcButton = document.querySelector(".calcBtn");
  const progressBar = document.querySelector(".progress-bar");

  let typingTimeout; // To control typewriter animation

  calcButton.addEventListener("click", calculateAttendance);

  function calculateAttendance() {
    let attended = parseInt(attendedInput.value);
    let conducted = parseInt(conductedInput.value);
    let required = parseFloat(requiredInput.value);

    // Input validation
    if (isNaN(attended) || isNaN(conducted) || isNaN(required) || conducted === 0) {
      display.innerText = "Please enter valid values.";
      progressBar.style.width = "0%";
      return;
    }

    // Calculate attendance
    let attendance = (attended / conducted) * 100;
    attendance = parseFloat(attendance.toFixed(2));
    let days = 0;

    let result = `current attendance: ${attendance}%<br>`;

    if (attendance >= required) {
      result += "You already have required attendance.";
    } else {
      while (attendance < required) {
        days++;
        attended += 6;
        conducted += 6;
        attendance = (attended / conducted) * 100;
      }
      result += `You need to attend:${days} days.`;
    }

    // Animate progress bar
    progressBar.style.width = `${Math.min(attendance, 100)}%`;

    // Reset any previous typewriter effect
    clearTimeout(typingTimeout);
    display.innerHTML = "";
    let i = 0;

    function typeWriter() {
      if (i < result.length) {
        display.innerHTML += result.charAt(i);
        i++;
        typingTimeout = setTimeout(typeWriter, 20);
      }
    }

    typeWriter();
  }
});



