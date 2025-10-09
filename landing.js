document.addEventListener("DOMContentLoaded", function () {
  const guidePopup = document.getElementById("guidePopup");
  const gotItBtn = document.getElementById("gotItBtn");
  const mainContainer = document.querySelector(".mainContainer");
  const overlay = document.getElementById("focusOverlay");
  const inHouseBtn = document.querySelector(".in-house-btn");

  if (!guidePopup || !gotItBtn || !mainContainer || !inHouseBtn || !overlay) return;

  // Show overlay and popup initially
  overlay.style.display = "block";
  guidePopup.style.display = "flex";
  inHouseBtn.classList.add("highlight");

  const containerWidth = mainContainer.clientWidth;
  const containerHeight = mainContainer.clientHeight;

  // Position popup near In-House button
  let top = inHouseBtn.offsetTop - guidePopup.offsetHeight - 10;
  let left = inHouseBtn.offsetLeft;

  if (top < 10) {
    top = inHouseBtn.offsetTop + inHouseBtn.offsetHeight + 10;
  }

  if (top + guidePopup.offsetHeight > containerHeight - 10) {
    top = containerHeight - guidePopup.offsetHeight - 10;
  }

  if (left < 10) left = 10;
  if (left + guidePopup.offsetWidth > containerWidth - 10) {
    left = containerWidth - guidePopup.offsetWidth - 10;
  }

  guidePopup.style.top = top + "px";
  guidePopup.style.left = left + "px";

  // Remove overlay and popup on "Got it" click
  gotItBtn.addEventListener("click", () => {
    guidePopup.style.display = "none";
    overlay.style.display = "none";
    inHouseBtn.classList.remove("highlight");
  });

  // Redirect In-House button to inhouse.html
  inHouseBtn.addEventListener("click", () => {
    window.location.href = "inhouse.html";
  });
});
