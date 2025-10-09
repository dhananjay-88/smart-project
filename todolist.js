document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".footer .nav-item");

  // ✅ Remove active from all first
  navItems.forEach(i => i.classList.remove("active"));

  // ✅ Set active only if we are on this page
  const currentPage = window.location.pathname.split("/").pop().toLowerCase();
  if (currentPage === "todolist.html") {
    const todoBtn = document.querySelector(".todo-btn");
    if (todoBtn) todoBtn.classList.add("active");
  }

  // ✅ Footer navigation click logic
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove active from all
      navItems.forEach(i => i.classList.remove("active"));
      // Add active to clicked
      item.classList.add("active");

      // Page redirection based on which icon is clicked
      if (item.classList.contains("home-btn")) {
        window.location.href = "inhouse.html";
      } else if (item.classList.contains("notification-btn")) {
        window.location.href = "notification.html";
      } else if (item.classList.contains("todo-btn")) {
        window.location.href = "todolist.html";
      } else if (item.classList.contains("stats-btn")) {
        window.location.href = "statistics.html";
      } else if (item.classList.contains("message-btn")) {
        window.location.href = "message.html";
      }
    });
  });
});


// ✅ Optional UI interactions (if needed later)
document.addEventListener("DOMContentLoaded", () => {
  const inboxToggle = document.querySelector(".inbox-toggle");
  const inboxItems = document.querySelector(".inbox-items");
  const tabs = document.querySelectorAll(".tab");
  const inboxSection = document.querySelector(".inbox-items");
  const inboxToggleBtn = document.querySelector(".inbox-toggle");
  const chatContainer = document.querySelector(".chat-items-container");
  const chatScreen = document.querySelector(".chat-screen");

  if (chatContainer) chatContainer.style.display = "none";
  if (chatScreen) chatScreen.style.display = "none";

  // Toggle "Show More" for inbox (if present)
  if (inboxToggle && inboxItems) {
    inboxToggle.addEventListener("click", () => {
      inboxItems.classList.toggle("show-all");
      inboxToggle.textContent = inboxItems.classList.contains("show-all")
        ? "Show Less ▲"
        : "Show More ▼";
    });
  }

  // Mail ↔ Chat Tabs (if present)
  if (tabs && inboxSection && inboxToggleBtn && chatContainer && chatScreen) {
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const isMail = tab.textContent === "Mail";
        inboxSection.style.display = isMail ? "block" : "none";
        inboxToggleBtn.style.display = isMail ? "block" : "none";
        chatContainer.style.display = isMail ? "none" : "block";
        chatScreen.style.display = "none";
      });
    });
  }

  // Chat interaction (if any chat items exist)
  const chatItems = document.querySelectorAll(".chat-item");
  chatItems.forEach(item => {
    const name = item.querySelector(".chat-name")?.textContent.trim();
    if (name === "Store Manager") {
      item.addEventListener("click", () => {
        chatContainer.style.display = "none";
        chatScreen.style.display = "flex";
        window.scrollTo(0, 0);
      });
    }
  });
});
