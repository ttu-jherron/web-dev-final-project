//Start Global Variables
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//End Global Variables

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

document.querySelector('#btnLogin').addEventListener('click', (event) => {
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
    if (strPassword.length < 6) {
        blnError = true
        strMessage += "<p class='mt-0 mb-0'>You must enter a password</p>"
    }
    if (blnError) {
        Swal.fire({
            title: 'There are still some errors in the information',
            html: strMessage,
            icon: 'error'
        })
    }
})
document.querySelector('#btnRegister').addEventListener('click', (event) => {

    // Retrieve the values from your registration form
    const strEmail = document.querySelector('#txtUsername').value.trim().toLowerCase()
    const strPassword = document.querySelector('#txtPassword').value
    const strFirstName = document.querySelector('#txtFirstName').value
    const strLastName = document.querySelector('#txtLastName').value
    
    let blnError = false
    let strMessage = ''
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
    
    if (blnError) {
        Swal.fire({
            title: 'There are still some errors in the information',
            html: strMessage,
            icon: 'error'
        })
    }
})