document.addEventListener("DOMContentLoaded", () => {
  // Home button redirect
  const homeBtn = document.querySelector(".home-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "landing.html";
    });
  }

  // Grid redirects
  const sectionRedirects = {
    "Billing Counter": "billing.html",
    "Quick Commerce": "quickCommerce.html",
    "Food": "food.html",
    "Home & Personal Care": "personalCare.html",
    "Staple": "staple.html",
    "Apparel": "apparel.html",
    "Dairy & Frozen Items": "dairy.html",
    "Fruits & Veggies": "fruits.html",
    "General Merchandise": "merchandise.html",
    "Warehouse": "warehouse.html"
  };

  document.querySelectorAll(".grid-card").forEach(card => {
    const img = card.querySelector("img");
    const targetPage = sectionRedirects[img.alt];
    if (targetPage) {
      card.addEventListener("click", () => {
        window.location.href = targetPage;
      });
    }
  });

  // Footer active icon toggle + navigation
  const navItems = document.querySelectorAll('.footer .nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all
      navItems.forEach(i => i.classList.remove('active'));

      // Add active to clicked one
      item.classList.add('active');

      // Redirects
      if (item.classList.contains('home-btn')) {
        window.location.href = 'index.html';
      } 
      else if (item.classList.contains('message-btn')) {
        window.location.href = 'message.html';
      } 
      else if (item.classList.contains('todo-btn')) {
        window.location.href = 'todolist.html';
      } 
      else if (item.classList.contains('stats-btn')) {
        window.location.href = 'statistics.html';
      }
    });
  });
});
