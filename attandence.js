document.addEventListener("DOMContentLoaded", function () {
  const attendedInput = document.querySelector(".inp1");
  const conductedInput = document.querySelector(".inp2");
  const requiredInput = document.querySelector(".inp3");
  const display = document.querySelector(".display");
  const calcButton = document.querySelector(".calcBtn");
  const progressBar = document.querySelector(".progress-bar");

  let typingTimeout;

  calcButton.addEventListener("click", calculateAttendance);

  function calculateAttendance() {
    let attended = parseInt(attendedInput.value);
    let conducted = parseInt(conductedInput.value);
    let required = parseFloat(requiredInput.value);

    // Input validation
    if (isNaN(attended) || isNaN(conducted) || isNaN(required) || conducted === 0) {
      progressBar.style.width = "0%";
      display.innerHTML = `<div style="color: red; font-weight: bold;">🚫 Please enter valid values.</div>`;
      return;
    }

    // Calculate attendance
    let attendance = (attended / conducted) * 100;
    attendance = parseFloat(attendance.toFixed(2));
    let days = 0;

    let result = `<div><strong>📊 Current Attendance:</strong> ${attendance}%</div>`;

    if (attendance >= required) {
      result += `<div style="color: green;"><strong>✅ You're good!</strong> You already have the required attendance.</div>`;
    } else {
      while (attendance < required) {
        days++;
        attended += 6;
        conducted += 6;
        attendance = (attended / conducted) * 100;
      }
      result += `<div style="color: orange;"><strong>⚠️ Attention:</strong> You need to attend <strong>${days} days</strong> to reach ${required}%.</div>`;
    }

    // Animate progress bar
    progressBar.style.width = `${Math.min(attendance, 100)}%`;

    // Animate HTML result
    animateHTML(result);
  }

  function animateHTML(html) {
    display.innerHTML = "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const nodes = Array.from(tempDiv.childNodes);
    let i = 0;

    function animateNode() {
      if (i < nodes.length) {
        display.appendChild(nodes[i]);
        i++;
        setTimeout(animateNode, 300); // Delay between lines
      }
    }

    animateNode();
  }
});





