const openPopupBtn = document.getElementById('openPopupBtn');
const assignTaskPopup = document.getElementById('assignTaskPopup');
const cancelBtn = document.getElementById('cancelBtn');
const assignBtn = assignTaskPopup.querySelector('.assign-btn'); // Assign Task button
const successPopup = document.getElementById('successPopup');

const allotBtn = document.querySelector('.primary'); // Allot In-charge button
const allotPopup = document.getElementById('allotInchargePopup');
const closeAllotPopup = document.getElementById('closeAllotPopup');
const allotAssignBtn = document.getElementById('allotAssignBtn'); // Assign button in Allot popup
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

const rohanNameHeading = document.querySelector('.incharge-info .left h4');
const rohanTaskPara = document.querySelector('.incharge-info .left p:last-child');
const rohanAvatar = document.querySelector('.incharge-info .avatar');

// =================== Assign Task Popup ===================
openPopupBtn.addEventListener('click', () => {
    assignTaskPopup.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    assignTaskPopup.style.display = 'none';
});

assignTaskPopup.addEventListener('click', e => {
    if (e.target === assignTaskPopup) assignTaskPopup.style.display = 'none';
});

successPopup.addEventListener('click', e => {
    if (e.target === successPopup) successPopup.style.display = 'none';
});

assignBtn.addEventListener('click', () => {
    const taskInputs = assignTaskPopup.querySelectorAll('.task-lines input[type="text"]');
    const enteredTask = taskInputs[0].value.trim();

    if (enteredTask) {
        rohanTaskPara.textContent = enteredTask;
    }

    assignTaskPopup.style.display = 'none';
    successPopup.style.display = 'flex';

    setTimeout(() => { 
        successPopup.style.display = 'none'; 
    }, 2000);
});

// =================== Allot In-Charge Popup ===================
allotBtn.addEventListener('click', () => {
    allotPopup.style.display = 'flex';

    const staffCards = document.querySelectorAll('.staff-list .staff-card');

    tabContents.forEach(content => {
        content.innerHTML = '';

        staffCards.forEach((card, index) => {
            const clone = card.cloneNode(true);

            // Remove original "Allot other task" button
            const btn = clone.querySelector('button');
            if (btn) btn.remove();

            // Create checkbox container (right side)
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('select-staff');

            // Append checkbox to the right, keeping name + photo on left
            clone.style.display = 'flex';
            clone.style.justifyContent = 'space-between';
            clone.appendChild(checkbox);

            // Update names and photos for Other Section
            if (content.classList.contains('otherSection')) {
                const h5 = clone.querySelector('.staff-info h5');
                const img = clone.querySelector('.staff-info .avatar');

                const otherSectionStaff = [
                    { name: 'Vinakay Nair', photo: 'assets/billing/other1.png' },
                    { name: 'Ritesh Jain', photo: 'assets/billing/other2.png' },
                    { name: 'Sonia Mehta', photo: 'assets/billing/other3.png' },
                    { name: 'Aditya Verma', photo: 'assets/billing/other4.png' },
                    { name: 'Kavita Patil', photo: 'assets/billing/other5.png' },
                    { name: 'Pranav Rao', photo: 'assets/billing/other6.png' },
                    { name: 'Tanvi Desai', photo: 'assets/billing/other7.png' },
                    { name: 'Manish Kulkarni', photo: 'assets/billing/other8.png' },
                    { name: 'Richa Singh', photo: 'assets/billing/other9.png' }
                ];

                if (otherSectionStaff[index]) {
                    h5.textContent = otherSectionStaff[index].name;
                    img.src = otherSectionStaff[index].photo;
                }
            }

            content.appendChild(clone);
        });
    });
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-tab');
        tabContents.forEach(tc => tc.classList.remove('active'));
        document.querySelector(`.${target}`).classList.add('active');
    });
});

// Close Allot popup
closeAllotPopup.addEventListener('click', () => {
    allotPopup.style.display = 'none';
});

allotPopup.addEventListener('click', e => {
    if (e.target === allotPopup) allotPopup.style.display = 'none';
});

// =================== Assign button in Allot In-Charge ===================
allotAssignBtn.addEventListener('click', () => {
    // Find selected staff
    let selectedStaff = [];
    tabContents.forEach(content => {
        const checkedBoxes = content.querySelectorAll('.staff-card input.select-staff:checked');
        checkedBoxes.forEach(checkbox => {
            const card = checkbox.parentElement;
            const name = card.querySelector('.staff-info h5').textContent;
            const photo = card.querySelector('.staff-info .avatar').src; // <-- photo captured here
            selectedStaff.push({ name, photo });
        });
    });

    if (selectedStaff.length === 0) {
        alert("Please select at least one staff!");
        return;
    }

    const firstStaff = selectedStaff[0];

    // Update main In-Charge section with name AND photo
    rohanNameHeading.textContent = firstStaff.name;
    rohanAvatar.src = firstStaff.photo; // <-- main photo updated
    rohanTaskPara.textContent = "Today's Task";

    // Success popup text only (keep tick image)
    const successMsgPara = successPopup.querySelector('.success-msg');
    successMsgPara.innerHTML = `<strong>${firstStaff.name}</strong> has appointed task in charge of billing counter`;

    allotPopup.style.display = 'none';
    successPopup.style.display = 'flex';

    setTimeout(() => {
        successPopup.style.display = 'none';
        successMsgPara.textContent = 'The task has been successfully assigned to the staff.';
    }, 2000);
});
