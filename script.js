document.addEventListener("DOMContentLoaded", () => {

  // Logo click → redirect to Page 1
  const logo = document.querySelector(".logo img");
  if (logo) {
    logo.style.cursor = "pointer";
    logo.addEventListener("click", () => {
      window.location.href = "page1.html";
    });
  }

  // Get form fields
  const usernameInput = document.querySelector("#usernamePage2");
  const employeeSelect = document.querySelector("#employeeSelect");
  const locationSelect = document.querySelector("#locationSelect");
  const loginBtn = document.querySelector(".login-btn");

  // Disable login button initially
  loginBtn.disabled = true;
  loginBtn.style.cursor = "not-allowed";

  // Function to check if all fields are filled
  const checkFields = () => {
    const usernameFilled = usernameInput.value.trim() !== "";
    const employeeFilled = employeeSelect.value !== "";
    const locationFilled = locationSelect.value !== "";

    if (usernameFilled && employeeFilled && locationFilled) {
      loginBtn.disabled = false;
      loginBtn.classList.add("active");
      loginBtn.style.cursor = "pointer"; // ✅ cursor changes to pointer
    } else {
      loginBtn.disabled = true;
      loginBtn.classList.remove("active");
      loginBtn.style.cursor = "not-allowed"; // cursor back to disabled
    }
  };

  // Listen for input/select changes
  usernameInput.addEventListener("input", checkFields);
  employeeSelect.addEventListener("change", checkFields);
  locationSelect.addEventListener("change", checkFields);

  // Handle login button click
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!loginBtn.disabled) {
      window.location.href = "landing.html";
    }
  });

  // Autofill username from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const usernameFromURL = urlParams.get("username");
  if (usernameFromURL) {
    usernameInput.value = usernameFromURL;
    checkFields(); // recheck fields after autofill
  }

});
