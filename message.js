document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".footer .nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            // Redirect pages
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

document.addEventListener("DOMContentLoaded", () => {
    const inboxToggle = document.querySelector(".inbox-toggle");
    const inboxItems = document.querySelector(".inbox-items");
    const tabs = document.querySelectorAll(".tab");
    const inboxSection = document.querySelector(".inbox-items");
    const inboxToggleBtn = document.querySelector(".inbox-toggle");
    const chatContainer = document.querySelector(".chat-items-container");
    const chatScreen = document.querySelector(".chat-screen");
    const navItems = document.querySelectorAll(".footer .nav-item");

    // Initial states
    chatContainer.style.display = "none";
    chatScreen.style.display = "none";

    // Toggle "Show More" for inbox
    inboxToggle.addEventListener("click", () => {
        inboxItems.classList.toggle("show-all");
        inboxToggle.textContent = inboxItems.classList.contains("show-all")
            ? "Show Less ▲"
            : "Show More ▼";
    });

    // Mail ↔ Chat Tabs
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const isMail = tab.textContent === "Mail";

            inboxSection.style.display = isMail ? "block" : "none";
            inboxToggleBtn.style.display = isMail ? "block" : "none";
            chatContainer.style.display = isMail ? "none" : "block";
            chatScreen.style.display = "none"; // always hide chat screen when switching tabs
        });
    });

    // Footer navigation
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    // Open chat screen for Store Manager
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
