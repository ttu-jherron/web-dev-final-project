/**
 * Login.js - Handles user authentication, registration, and dashboard functionality
 * for both students and instructors in the Student Reviews application.
 */

//Start Global Variables

// Regular expression for validating email format
// Validates local part, @ symbol, and domain structure according to standard format
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

//End Global Variables

/**
 * Helper Functions Section
 * Updates the Student Dashboard UI based on group join state.
 * - Shows "Leave Group" button and message if in a group
 * - Shows "Join Group" section if not in a group
*/

// Tracks which group the student has joined (null means no group)
let currentGroupKey = null;

function updateGroupUI() {
    const leaveSection = document.querySelector('#leaveGroupSection');
    const submitFeedback = document.querySelector('#divAddFeedback')
    const joinSection = document.querySelector('#joinGroupSection');
    const joinMsg = document.querySelector('#joinGroupMsg');

    if (currentGroupKey) {
        // Student is in a group: show leave option and group message
        leaveSection.style.display = 'block';
        submitFeedback.style.display = 'block';
        joinSection.style.display = 'none';
        joinMsg.innerHTML = `<p class="text-info">You are currently in group <code>${currentGroupKey}</code>.</p>`;
    } else {
        // Student is not in a group: show join input and hide leave button
        leaveSection.style.display = 'none';
        joinSection.style.display = 'block';
        joinMsg.innerHTML = '';
    }
}

// Mock group member data (temporary for this iteration)
const mockGroupMembers = [
    {
        name: "Alice Johnson",
        email: "alice@example.com",
        discord: "alice#1234",
        phone: "555-1234"
    },
    {
        name: "Bob Martinez",
        email: "bob@example.com",
        discord: "bobinator#5678",
        phone: "555-5678"
    },
    {
        name: "Charlie Wu",
        email: "charlie@example.com",
        discord: "charlieW#4321",
        phone: "555-9012"
    }
]

/**
 * Renders a list of mock group members in the student dashboard.
 * This simulates pulling group member info from the backend later.
 */
function displayGroupMembers() {
    const section = document.querySelector('#groupMembersSection');
    const list = document.querySelector('#groupMemberList');

    // Clear out any existing content
    list.innerHTML = '';

    // Loop through mock members and create list items
    mockGroupMembers.forEach(member => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        li.innerHTML = `
            <strong>Name:</strong> ${member.name}<br>
            <strong>Email:</strong> ${member.email}<br>
            <strong>Discord:</strong> ${member.discord}<br>
            <strong>Phone:</strong> ${member.phone}
        `;

        list.appendChild(li);
    });

    // Show the group members section
    section.style.display = 'block';
}


/**
 * Form Navigation Section
 * Controls switching between login and registration forms
 */

// click event for btnSwapRegister to hide frmLogin and show frmRegister
document.querySelector('#btnSwapRegister').addEventListener('click', (event) => {
    document.querySelector('#frmLogin').style.display = 'none'
    document.querySelector('#frmRegister').style.display = 'block'
})

// click event for btnSwapLogin to hide frmRegister and show frmLogin
document.querySelector('#btnSwapLogin').addEventListener('click', (event) => {
    document.querySelector('#frmRegister').style.display = 'none'
    document.querySelector('#frmLogin').style.display = 'block'
})

/**
 * Login Functionality
 * Validates user input and shows appropriate dashboard on successful login
 */
document.querySelector('#btnLogin').addEventListener('click', (event) => {
    // Get and normalize user input
    const strEmail = document.querySelector('#txtLoginUsername').value.trim().toLowerCase()
    const strPassword = document.querySelector('#txtLoginPassword').value

    // Validate the data
    let blnError = false
    let strMessage = ''

    //appends p tags to strMessage for every missed submission requirement and displays all relevant
    //information so the user can meet those requirements
    if (!regEmail.test(strEmail)) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>You must enter a valid email</p>"
    }
    if (strPassword.length < 1) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>You must enter a password</p>"
    }
    
    // Display validation errors using SweetAlert if any exist
    if (blnError) {
        Swal.fire({
            title: 'There are still some errors in the information',
            html: strMessage,
            icon: 'error'
        })
    }

    // Get selected user role (Student or Instructor)
    const role = document.querySelector('#selRoleLogin').value

    // If validation passed, hide login forms and show appropriate dashboard
    if (!blnError) {
        // Hide login and register forms
        document.querySelector('#frmLogin').style.display = 'none'
        document.querySelector('#frmRegister').style.display = 'none'

        // Show appropriate dashboard based on selected role
        if (role === 'Student') {
            document.querySelector('#divStudentDashboard').style.display = 'block'
        } else if (role === 'Instructor') {
            document.querySelector('#divInstructorDashboard').style.display = 'block'
        }
    }
})

/**
 * Registration Functionality
 * Collects and validates user registration information
 */
document.querySelector('#btnRegister').addEventListener('click', (event) => {
    // Retrieve the values from the registration form
    const strEmail = document.querySelector('#txtUsername').value.trim().toLowerCase()
    const strPassword = document.querySelector('#txtPassword').value
    const strFirstName = document.querySelector('#txtFirstName').value
    const strLastName = document.querySelector('#txtLastName').value
    
    // Initialize validation variables
    let blnError = false
    let strMessage = ''
    
    // Validate each field and build error message if needed
    if (strFirstName.length < 1) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>You must enter a first name</p>"
    }
    if (strLastName.length < 1) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>You must enter a last name</p>"
    }
    if (!regEmail.test(strEmail)) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>You must enter a valid email</p>"
    }
    if (strPassword.length < 6) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>Password must be at least 6 characters</p>"
    }
    
    // Display validation errors using SweetAlert if any exist
    if (blnError) {
        Swal.fire({
            title: 'There are still some errors in the information',
            html: strMessage,
            icon: 'error'
        })
    }

    // Get selected user role (Student or Instructor)
    // This is used to determine which dashboard to show after registration
    const role = document.querySelector('#selRoleRegister').value

    // If validation passed, hide login forms and show appropriate dashboard
    if (!blnError) {
        // Hide login and register forms
        document.querySelector('#frmLogin').style.display = 'none'
        document.querySelector('#frmRegister').style.display = 'none'

        // Show appropriate dashboard based on selected role
        if (role === 'Student') {
            document.querySelector('#divDashboard').style.display = 'block'
            updateGroupUI() // Update group UI for student
        } else if (role === 'Instructor') {
            document.querySelector('#divInstructorDashboard').style.display = 'block'
        }
    }

    // Note: Registration success handling would go here (currently not implemented)
})


// * Student Dashboard Functionality *

//***** new code *****
// Simulated group state (for now)

// Handles "Join Group" button
document.querySelector('#btnJoinGroup')?.addEventListener('click', () => {
    const groupKey = document.querySelector('#txtGroupKey').value.trim();

    // clears the old messages
    document.querySelector('#joinGroupMsg').innerHTML = '';
    document.querySelector('#leaveGroupMsg').innerHTML = '';

    // #TODO: this is solely used as an example, we will be using a database to store group keys
    const validKeys = ['GROUP123', 'ABC456'];

    if (groupKey.length < 1) {
        document.querySelector('#joinGroupMsg').innerHTML = `<p class="text-danger">Please enter a group key.</p>`;
        return;
    }

    if (validKeys.includes(groupKey.toUpperCase())) {
        currentGroupKey = groupKey.toUpperCase();
        updateGroupUI();
        displayGroupMembers(); // Show group members after joining

        /******************************************************************************
        Adding survey button here and will be toggled on when the instructor of the
        class decides to send out the survey. Delete this comment when the code is
        implemented.
        *******************************************************************************/

        if (true) {
            document.querySelector('#divTakeSurvey').style.display = 'block'
        }
    } else {
        document.querySelector('#joinGroupMsg').innerHTML = `<p class="text-danger">Invalid group key. Please try again.</p>`;
    }
});

// Handle "Leave Group" button 
// #FIXME: **Note to self add comments to this section of code as it shows things not covered in class**
document.querySelector('#btnLeaveGroup')?.addEventListener('click', () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will leave the current group and need to re-enter a key to rejoin.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, leave group',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            currentGroupKey = null;
            updateGroupUI();

            /// Clear join group message
            document.querySelector('#joinGroupMsg').innerHTML = '';

            // Show success message
            document.querySelector('#leaveGroupMsg').innerHTML = `<p class="text-success">You have left the group.</p>`;

            // Hide group members section when leaving the group
            document.querySelector('#groupMembersSection').style.display = 'none';
        }
    });
});


/**
 * Instructor Dashboard Functionality
 * Handles creating new groups/classes
 * Note: The optional chaining (?.) operator is used in case the button doesn't exist in the DOM AI helped a lot in the creation of this code block
 * as we are now implementing li for the ul we used in the html and we have that random group key both of which were not really taught in class so i will provide good comments to help us learn
 */
document.querySelector('#btnCreateGroup')?.addEventListener('click', () => {
    const className = document.querySelector('#txtClassName').value.trim()
    const createGroupMsg = document.querySelector('#createGroupMsg')
    const groupList = document.querySelector('#groupList')

    // Validate class name is not empty
    if (className.length < 1) {
        createGroupMsg.innerHTML = `<p class="text-danger">Please enter a class name.</p>`
        return
    }

    // Generate a random group key, * created using chatgpt *
    const groupKey = 'KEY-' + Math.random().toString(36).substr(2, 5).toUpperCase()

    // Show success message with the generated key
    createGroupMsg.innerHTML = `<p class="text-success">Group created! Key: <strong>${groupKey}</strong></p>`

    // Add the new group to the displayed list
    // Create a new <li> element to represent the newly created group
    const li = document.createElement('li')

    // Apply a Bootstrap class for clean list styling
    li.className = 'list-group-item'

    // Set the inner HTML to display the class name and group key (bold + code formatting)
    li.innerHTML = `<strong>${className}</strong> — Key: <code>${groupKey}</code>`

    // Add this <li> to the group list in the UI so it appears on screen
    groupList.appendChild(li)

    // Clear input field for next entry
    document.querySelector('#txtClassName').value = ''
})

document.querySelector('#btnAddFeedback')?.addEventListener('click', () => {
    document.querySelector('#divStudentDashboard').style.display = 'none'
    document.querySelector('#divFeedbackForm').style.display = 'block'

    // Clear the previous options in the dropdown
    document.querySelector('#txtFeedback').value = ''
    let strHTML = '<option disabled selected hidden >Select a group member</option>'

    mockGroupMembers.forEach(member => {
        strHTML += `<option value="${member.name}" aria-label="${member.name}">${member.name}</option>`
    })
    document.querySelector('#selGroupMember').innerHTML = strHTML
})

document.querySelector('#btnSubmitFeedback')?.addEventListener('click', () => {
    strHTML = ''
    blnError = false
    if (document.querySelector('#selGroupMember').value == 'Select a group member') {
        blnError = true
        strHTML += "<p class='mt-0 mb-0'>You must select a group member</p>"
    }
    if (document.querySelector('#txtFeedback').value.trim().length < 1) {
        blnError = true
        strHTML += "<p class='mt-0 mb-0'>You must enter feedback</p>"
    }
    if (document.querySelector('#txtFeedback').value.trim().length > 500) {
        blnError = true
        strHTML += "<p class='mt-0 mb-0'>Feedback must be 500 characters or less</p>"
    }
    if (blnError == false) {
        const strRecipient = document.querySelector('#selGroupMember').value
        const strFeedback = document.querySelector('#txtFeedback').value.trim()

        /*
         * Will be unctionality to send feedback to the backend to be stored in the database
         * This is a placeholder for the actual implementation.
         */
        Swal.fire({
            title: 'Feedback submitted successfully!',
            icon: 'success'
        })
        // Return user to dashboard after feedback submission
        document.querySelector('#divStudentDashboard').style.display = 'block'
        document.querySelector('#divFeedbackForm').style.display = 'none'
        
    } else if (blnError == true) {
        Swal.fire({
            title: 'There are still some errors in the information',
            html: strHTML,
            icon: 'error'
        })
    }
})

document.querySelector('#btnBackToDashboard')?.addEventListener('click', () => {
    document.querySelector('#divStudentDashboard').style.display = 'block'
    document.querySelector('#divFeedbackForm').style.display = 'none'
})

document.querySelector('#btnTakeSurvey')?.addEventListener('click', () => {
    getSurveyQuestions()
})

document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'btnBackToDashboardSurvey') {
        document.querySelector('#divStudentSurvey').querySelectorAll('input, textarea, select').forEach(element => {
            if (element.type === 'checkbox' || element.type === 'radio') {
                element.checked = false;
            } else {
                element.value = '';
            }
        });
        document.querySelector('#divStudentSurvey').style.display = 'none';
        document.querySelector('#divStudentDashboard').style.display = 'block';
    }
});

function getSurveyQuestions() {
    fetch('./survey.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('#divStudentSurvey').innerHTML = data
        let strHTML = '<option disabled selected hidden >Select a group member</option>'
        mockGroupMembers.forEach(member => {
            strHTML += `<option value="${member.name}" aria-label="${member.name}">${member.name}</option>`
        })
        document.querySelector('#selGroupMemberSurvey').innerHTML = strHTML
        document.querySelector('#divStudentSurvey').style.display = 'block'
        document.querySelector('#divStudentDashboard').style.display = 'none'
    })
    .catch(error => console.error('Error loading survey questions:', error))
}