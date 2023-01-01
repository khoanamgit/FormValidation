const btnLogin = document.querySelector('.form-btn')
const form = document.querySelector('.form-register')
const errorItem = document.querySelectorAll('span')
const formData = []
const userName = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword =  document.querySelector('#confirm-password')

function handleSubmit() {
    formData.push({
        username: userName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    })
    userName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value =''
    // console.log(formData)
}

// Show error function
function showError(input,mes){
    const formControl = input.parentElement
    const textError = formControl.querySelector('span')
    // console.log(textError)
    textError.innerText = mes
    // console.log(formControl)
    formControl.classList.add('active')
    
}
// Show success
function showSuccess(input){
    const formControl = input.parentElement
    // console.log(formControl)
    const textError = formControl.querySelector('span')
    // console.log(textError)
    textError.innerText = ''
    formControl.classList.remove('active')
    userName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value =''

}

// Check required
function checkRequired(inputArr){
    let isRequired = false
    inputArr.map(input => {
        if(input.value.trim() === ''){
            showError(
                input,
                `${getFieldName(input)} is required`
            )
            isRequired = true
        }else{
            showSuccess(input)
        }
    })
    return isRequired
}

// Check length userName and password
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        )
    } else if(input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        )
    }else {
        showSuccess(input)
    }
}

// Check password confirm
function checkPasswordConfirm (input1, input2) {
    if(input1.value !== input2.value){
        showError(input2,`${getFieldName(input2)} is not equal password`)
    }
}

// Check email
function checkEmail(input){
    const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(input.value.trim())) {
		showSuccess(input)
	} else {
		showError(input, 'Email is not valid')
	}
}

// Get file name
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function checkValid(){

    if(!checkRequired([userName, email, password, confirmPassword])){
        checkLength(userName, 6, 20)
        checkLength(password, 6, 30)
        checkPasswordConfirm(password, confirmPassword)
        checkEmail(email)
    

    }
   
}

// console.log(checkValid())

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(!checkRequired([userName, email, password, confirmPassword])){
        checkLength(userName, 6, 20)
        checkLength(password, 6, 30)
        checkPasswordConfirm(password, confirmPassword)
        checkEmail(email)
    }
    
    
})