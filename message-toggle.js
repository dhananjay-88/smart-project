document.addEventListener("DOMContentLoaded", () => {
    // Toggle Inbox emails
    const inboxToggle = document.querySelector(".inbox-toggle");
    const inboxItems = document.querySelector(".inbox-items");

    inboxToggle.addEventListener("click", () => {
        inboxItems.classList.toggle("show-all");
        inboxToggle.textContent = inboxItems.classList.contains("show-all")
            ? "Show Less ▲"
            : "Show More ▼";
    });

    // Toggle Sent emails
    const sentToggle = document.querySelector(".sent-toggle");
    const sentItems = document.querySelector(".sent-items");

    sentToggle.addEventListener("click", () => {
        sentItems.classList.toggle("show-all");
        sentToggle.textContent = sentItems.classList.contains("show-all")
            ? "Show Less ▲"
            : "Show More ▼";
    });

    // Mail / Chat tab switch
    const tabs = document.querySelectorAll(".tab");
    const inboxLabel = document.querySelectorAll(".section-label")[0];
    const sentLabel = document.querySelectorAll(".section-label")[1];
    const inboxToggleBtn = document.querySelector(".inbox-toggle");
    const sentToggleBtn = document.querySelector(".sent-toggle");
    const inboxSection = document.querySelector(".inbox-items");
    const sentSection = document.querySelector(".sent-items");
    const chatContainer = document.querySelector(".chat-items-container");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // Highlight selected tab
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const isMailTab = tab.textContent.trim() === "Mail";

            // Toggle visibility
            inboxLabel.style.display = isMailTab ? "block" : "none";
            sentLabel.style.display = isMailTab ? "block" : "none";
            inboxToggleBtn.style.display = isMailTab ? "block" : "none";
            sentToggleBtn.style.display = isMailTab ? "block" : "none";
            inboxSection.style.display = isMailTab ? "block" : "none";
            sentSection.style.display = isMailTab ? "block" : "none";
            chatContainer.style.display = isMailTab ? "none" : "flex";
        });
    });
});
