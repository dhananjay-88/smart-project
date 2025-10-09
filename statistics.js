document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");

  // Remove active class from all nav items
  navItems.forEach(item => item.classList.remove("active"));

  // Add active only to Statistics page icon
  const statsBtn = document.querySelector(".stats-btn");
  if (statsBtn) statsBtn.classList.add("active");

  // Handle navigation clicks
  document.querySelector(".home-btn").addEventListener("click", () => {
    window.location.href = "inhouse.html";
  });

  document.querySelector(".message-btn").addEventListener("click", () => {
    window.location.href = "message.html";
  });

  document.querySelector(".notification-btn").addEventListener("click", () => {
    window.location.href = "notification.html";
  });

  document.querySelector(".todo-btn").addEventListener("click", () => {
    window.location.href = "todolist.html";
  });

  document.querySelector(".stats-btn").addEventListener("click", () => {
    window.location.href = "statistics.html";
  });

  // ================= Tabs: Day / Week / Month =================
  const tabs = document.querySelectorAll(".tab-btn");
  const calendarGrid = document.querySelector(".calendar-grid");
  let currentTab = "Day"; // default

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      currentTab = tab.textContent; // update current tab

      // Remove previous highlights
      calendarGrid.querySelectorAll("div").forEach((cell, index) => {
        if (index >= 7) cell.classList.remove("selected");
      });

      if (currentTab === "Day") {
        calendarGrid.querySelectorAll("div")[7].classList.add("selected");
      } else if (currentTab === "Week") {
        for (let i = 7; i < 14; i++) {
          calendarGrid.querySelectorAll("div")[i].classList.add("selected");
        }
      } else if (currentTab === "Month") {
        calendarGrid.querySelectorAll("div").forEach((cell, index) => {
          if (index >= 7) cell.classList.add("selected");
        });
      }

      // Update issue image based on current tab and selected radio
      updateIssueImage();
    });
  });

  // ================= Issues Occurred Radio Change =================
  const issueRadios = document.querySelectorAll('input[name="issue"]');
  const issueImg = document.querySelector(".issues-img");

  function updateIssueImage() {
    const selectedRadio = document.querySelector('input[name="issue"]:checked');
    if (!selectedRadio) return;

    // Define images for each combination: tab + issue
    const images = {
      Day: {
        High: "assets/day_high.png",
        Mid: "assets/day_mid.png",
        Low: "assets/day_low.png"
      },
      Week: {
        High: "assets/week_high.png",
        Mid: "assets/week_mid.png",
        Low: "assets/week_low.png"
      },
      Month: {
        High: "assets/month_high.png",
        Mid: "assets/month_mid.png",
        Low: "assets/month_low.png"
      }
    };

    let newSrc = images[currentTab][selectedRadio.value];

    // Smooth fade transition
    issueImg.style.opacity = 0;
    setTimeout(() => {
      issueImg.src = newSrc;
      issueImg.style.opacity = 1;
    }, 200);
  }

  issueRadios.forEach(radio => {
    radio.addEventListener("change", updateIssueImage);
  });

  // Initial load
  calendarGrid.querySelectorAll("div")[7].classList.add("selected");
  updateIssueImage();
});


