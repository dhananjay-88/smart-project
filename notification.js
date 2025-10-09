document.addEventListener("DOMContentLoaded", () => {
    // --- Existing Navigation Logic (unchanged) ---
    const navItems = document.querySelectorAll(".footer .nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            // ... (Your existing redirect logic) ...
        });
    });

    // --- Popups and Dynamic Elements ---
    const takeActionPopup = document.getElementById("takeActionPopup");
    const allotPopup = document.getElementById("allotStaffPopup");
    const alertSentPopup = document.getElementById("alertSentPopup"); // New: Image 1 Popup
    const staffNameDisplay = document.getElementById("staffNameDisplay"); // New: Element for dynamic name
    const confirmAllotBtn = document.getElementById("confirmAllotBtn");
    
    // Elements for the High Alert Card
    const highAlertCard = document.getElementById("highAlertCard");
    const alertActionButton = document.getElementById("alertActionButton"); // Initial 'Take action' button
    const alertProgressContainer = document.getElementById("alertProgressContainer"); // Image 2 element
    const trackAlertButton = document.getElementById("trackAlertButton"); // Image 2 element
    
    // Elements for Action Taken Section (Image 3)
    const actionTakenSection = document.getElementById("actionTakenSection");
    const actionStepsContainer = document.getElementById("actionSteps");
    const highAlertDate = "26 Nov"; // Hardcoded for Image 3, you might want to fetch this dynamically
    
    // State variable to mimic page refresh effect after allotment
    let isAllotted = localStorage.getItem('isAllotted') === 'true'; 
    let allottedStaffName = localStorage.getItem('allottedStaffName') || 'Myra Desai'; 
    let allottedStaffDate = localStorage.getItem('allottedStaffDate') || '07:00'; 
    
    // --- Function to update High Alert Card based on state (Image 2 logic) ---
    function updateHighAlertCard() {
        if (isAllotted) {
            alertActionButton.style.display = "none";
            alertProgressContainer.style.display = "flex";
            // Update the card's time to the new date (for Image 3 context)
            highAlertCard.querySelector('.time').textContent = allottedStaffDate; 
        } else {
            alertActionButton.style.display = "block";
            alertProgressContainer.style.display = "none";
        }
    }

    // --- Action Taken Timeline Logic (Image 3) ---
    const actionTimelineSteps = [
        { title: "In-Charge Informed About Alert", detail: `${allottedStaffName} & Aarav Jain Informed` },
        { title: "In-Charge Allotted Staff", detail: `${allottedStaffName} Allotted 2 Staff` },
        { title: "Staff On The Way", detail: "Staff Confirmed" },
        { title: "Staff Joined The Task", detail: "Alert Resolved Within 10 Minutes" }
    ];

    function createTimelineStep(step) {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('timeline-step');
        stepDiv.innerHTML = `
            <p class="timeline-step-title">${step.title}</p>
            <p class="timeline-step-detail">${step.detail}</p>
        `;
        return stepDiv;
    }

    function animateActionSteps() {
        actionTakenSection.style.display = "block";
        actionStepsContainer.innerHTML = ''; // Clear previous steps

        actionTimelineSteps.forEach((step, index) => {
            setTimeout(() => {
                const stepElement = createTimelineStep(step);
                actionStepsContainer.appendChild(stepElement);
                // Force a reflow before setting opacity to trigger transition
                void stepElement.offsetWidth; 
                stepElement.classList.add('visible');
            }, index * 3000); // 3-second delay between steps
        });
    }

    // --- Event Listeners ---

    // 1. Show Take Action popup
    document.querySelectorAll(".take-action").forEach(button => {
        button.addEventListener("click", () => {
            if (allotPopup) allotPopup.style.display = "none";
            takeActionPopup.style.display = "flex";
        });
    });

    // 2. Click outside to close popups
    [takeActionPopup, allotPopup, alertSentPopup].forEach(popup => {
        if (popup) {
            popup.addEventListener("click", e => {
                if (e.target === popup) {
                    popup.style.display = "none";
                }
            });
        }
    });

    // 3. Navigate from Take Action to Allot Staff
    if (takeActionPopup) {
        const options = takeActionPopup.querySelectorAll(".popup-option");
        options.forEach(option => {
            const txt = option.textContent.trim();
            if (txt === "Allot staff through In-charge") {
                option.addEventListener("click", () => {
                    takeActionPopup.style.display = "none";
                    if (allotPopup) allotPopup.style.display = "flex";
                });
            }
        });
    }

    // 4. Confirm Allot (Image 1 Logic)
    if (confirmAllotBtn) {
        confirmAllotBtn.addEventListener("click", () => {
            const selectedStaff = document.querySelector('input[name="staff"]:checked');
            if (selectedStaff) {
                const name = selectedStaff.value;
                
                // Set dynamic name for Image 1 popup
                staffNameDisplay.textContent = name;
                
                // Show Image 1 popup
                if (allotPopup) allotPopup.style.display = "none";
                alertSentPopup.style.display = "flex";
                
                // Store state and details for "page refresh" effect
                localStorage.setItem('isAllotted', 'true');
                localStorage.setItem('allottedStaffName', name);
                const date = new Date();
                const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                localStorage.setItem('allottedStaffDate', time); 
                
                // Simulate refresh or state change after showing popup
                setTimeout(() => {
                    alertSentPopup.style.display = 'none';
                    isAllotted = true;
                    allottedStaffName = name;
                    allottedStaffDate = time;
                    updateHighAlertCard(); // Apply Image 2 changes
                }, 2000); 

            } else {
                alert("Please select a staff member to allot.");
            }
        });
    }

    // 5. Track Alert Button Click (Image 3 Logic)
    if (trackAlertButton) {
        trackAlertButton.addEventListener('click', () => {
            // Update card content to match Image 3 (date update)
            highAlertCard.querySelector('.time').textContent = highAlertDate; // Set to 26 Nov
            
            // Apply Image 3 layout styles
            highAlertCard.classList.add('image-3-style');
            alertProgressContainer.style.display = 'none'; // Hide progress bar
            
            // Start the animated timeline
            animateActionSteps(); 
            
            // Scroll to the new section
            actionTakenSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initial check to set the correct card state on load (Image 2)
    updateHighAlertCard();
});